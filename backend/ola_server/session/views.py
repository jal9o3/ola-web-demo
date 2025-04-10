"""
This module defines views for handling VersusAISession API requests.

Classes:
    VersusAISessionView(APIView): Handles GET and POST requests for VersusAISession.

Functions:
    generate_access_key(): Generates a secure access key using URL-safe base64 encoding.

Class VersusAISessionView:
    Methods:
        get(request, *args, **kwargs): Retrieves all VersusAISession objects and returns them as a 
        JSON response.
        post(request, *args, **kwargs): Creates a new VersusAISession object from the provided data 
        and returns the created object as a JSON response.
"""
import secrets
import random
import copy

import torch
import torch.nn as nn
import torch.nn.functional as F

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from OLA.core import Player, Board, Infostate, InfostatePiece
from OLA.constants import Ranking, Result
from OLA.simulation import MatchSimulator
from OLA.training import TimelessBoard, ActionsFilter, DirectionFilter

from .models import VersusAISession, VersusAIGame
from .serializers import (VersusAISessionSerializer, VersusAISessionListSerializer,
                          VersusAIGameSerializer)

INPUT_SIZE = 147
OUTPUT_SIZE = 254


class FiveLayer(nn.Module):
    def __init__(self):
        super(FiveLayer, self).__init__()
        self.fc1 = nn.Linear(INPUT_SIZE, 256)
        self.fc2 = nn.Linear(256, 128)
        self.fc3 = nn.Linear(128, 64)
        self.fc4 = nn.Linear(64, 32)
        self.fc5 = nn.Linear(32, OUTPUT_SIZE)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = F.relu(self.fc3(x))
        x = F.relu(self.fc4(x))
        x = self.fc5(x)
        return F.softmax(x, dim=1)


def generate_access_key():
    """
    Generate a secure access key.
    This function generates a URL-safe, random access key using the `secrets` 
    module.
    Returns:
        str: A URL-safe, random access key string of length 32.
    """

    return secrets.token_urlsafe(32)


def generate_random_string(length=10):
    """
    Generate a random string of specified length.
    This function generates a random string using the `secrets` module.
    Args:
        length (int): The length of the random string to generate. Default is 10.
    Returns:
        str: A random string of the specified length.
    """
    alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    return ''.join(secrets.choice(alphabet) for _ in range(length))


class VersusAIMatchHistoryView(APIView):
    def get(self, request, *args, **kwargs):
        paginator = PageNumberPagination()
        paginator.page_size = 10  # Adjust page size as needed
        # Filter games where has_ended is True and order them in descending order
        games = VersusAIGame.objects.filter(has_ended=True).order_by('-id')  # Replace 'id' with your desired field
        result_page = paginator.paginate_queryset(games, request)
        serializer = VersusAIGameSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request, *args, **kwargs):
        game_id = request.data.get('id')
        if not game_id:
            return Response({'error': 'Game ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            game = VersusAIGame.objects.get(id=game_id)
            return Response({'game_data': {
                'id': game.id,
                'human_color': game.human_color,
                'ai_color': game.ai_color,
                'has_started': game.has_started,
                'has_ended': game.has_ended,
                'human_initial_formation': game.human_initial_formation,
                'ai_initial_formation': game.ai_initial_formation,
                'move_list': game.move_list,
                'current_infostate': game.current_infostate,
                'turn_number': game.turn_number,
                'player_to_move': game.player_to_move,
            }}, status=status.HTTP_200_OK)
        except VersusAIGame.DoesNotExist:
            return Response({'error': 'Game not found'}, status=status.HTTP_404_NOT_FOUND)


class VersusAISessionView(APIView):
    """
    VersusAISessionView handles the HTTP GET and POST requests for 
    VersusAISession objects.
    Methods:
    - get(self, request, *args, **kwargs): Retrieves all VersusAISession objects 
    and returns them serialized.
    - post(self, request, *args, **kwargs): Creates a new VersusAISession object 
    from the provided data if valid, and returns the serialized data with a 
    status of HTTP 201 Created. If the data is invalid, returns the errors with 
    a status of HTTP 400 Bad Request.
    """

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests to retrieve all VersusAISession objects.
        Args:
            request: The HTTP request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.
        Returns:
            Response: A Response object containing serialized data of all 
            VersusAISession objects.
        """

        sessions = VersusAISession.objects.all()
        serializer = VersusAISessionListSerializer(sessions, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Handle POST requests to create a new VersusAISession.
        This method deserializes the incoming request data using the 
        VersusAISessionSerializer.
        If the data is valid, it saves the new session and returns the 
        serialized data with a 201 Created status. If the data is invalid, it 
        returns the errors with a 400 Bad Request 
        status.
        Args:
            request (Request): The HTTP request object containing the data to be 
            deserialized.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.
        Returns:
            Response: A Response object containing the serialized data or errors 
            and the appropriate HTTP status code.
        """

        request.data['access_key'] = generate_access_key()

        # Generate a random name if not provided
        if not request.data.get('name'):
            request.data['name'] = generate_random_string()

        # Randomly assign colors
        colors = ['B', 'R']
        human_color = random.choice(colors)
        ai_color = 'R' if human_color == 'B' else 'B'

        # Generate AI initial formation
        ai_initial_formation = Player.get_sensible_random_formation(
            Ranking.SORTED_FORMATION)

        # Create a new VersusAIGame object
        game = VersusAIGame.objects.create(
            human_color=human_color,
            ai_color=ai_color,
            human_initial_formation={},
            ai_initial_formation=ai_initial_formation,
            move_list=[]
        )

        # Assign the created game to the session
        request.data['game'] = game.id

        serializer = VersusAISessionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_actions_filter(arbiter_board: Board, previous_action: str, previous_result: str,
                            attack_location: tuple[int, int]):
    reduced_branching, radius = 0, 1
    while reduced_branching <= 0:
        radius += 1
        if previous_result in [Result.WIN, Result.LOSS]:
            center = attack_location
        elif len(attack_location) == 0:
            center = (int(previous_action[0]), int(previous_action[1]))
        else:
            return None

        whitelist = arbiter_board.get_squares_within_radius(
            center=center, radius=radius)
        actions_filter = ActionsFilter(
            state=arbiter_board, directions=DirectionFilter(), square_whitelist=whitelist)
        reduced_branching = len(actions_filter.filter())
    return actions_filter

class GameDataView(VersusAISessionView):
    """
    GameDataView handles the HTTP GET and PATCH requests to retrieve and update 
    the game's data for a specific session.
    Methods:
    - get(self, request, *args, **kwargs): Retrieves the game's data for the 
    session if the access key is correct.
    - patch(self, request, *args, **kwargs): Updates the game's data for the 
    session if the access key is correct.
    """

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests to retrieve the game's data for a specific session.
        Args:
            request: The HTTP request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.
        Returns:
            Response: A Response object containing the game's data if the access 
            key is correct, otherwise an error message.
        """
        access_key = request.query_params.get('access_key')
        session_name = request.query_params.get('session_name')

        if not access_key or not session_name:
            return Response({'error': 'Access key and session name are required'
                             },
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            session = VersusAISession.objects.get(
                access_key=access_key, name=session_name)
        except VersusAISession.DoesNotExist:
            return Response({'error': 'Invalid access key or session name'},
                            status=status.HTTP_404_NOT_FOUND)

        game = session.game
        game_data = {
            'human_color': game.human_color,
            'ai_color': game.ai_color,
            'human_initial_formation': game.human_initial_formation,
            'move_list': game.move_list,
            'current_infostate': game.current_infostate,
            'turn_number': game.turn_number,
            'player_to_move': game.player_to_move,
        }
        return Response(game_data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        """
        Handles PATCH requests to update the game's data for a specific session.
        Args:
            request: The HTTP request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.
        Returns:
            Response: A Response object containing the updated game's data if 
            the access key is correct, otherwise an error message.
        """
        access_key = request.data.get('access_key')
        session_name = request.data.get('session_name')
        human_initial_formation = request.data.get('human_initial_formation')
        model_name = request.data.get('model')
        print(f"model_name {model_name}")

        if not access_key or not session_name:
            return Response({'error': 'Access key and session name are required'
                             },
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            session = VersusAISession.objects.get(
                access_key=access_key, name=session_name)
        except VersusAISession.DoesNotExist:
            return Response({'error': 'Invalid access key or session name'},
                            status=status.HTTP_404_NOT_FOUND)

        game = session.game

        if (not game.has_started and human_initial_formation is None):
            return Response(
                {'error':
                 'Human initial formation required before the game can start'
                 },
                status=status.HTTP_400_BAD_REQUEST)
        elif (game.has_started and human_initial_formation is None):
            human_initial_formation = game.human_initial_formation

        if (not game.has_started and not isinstance(human_initial_formation, list)
                or len(human_initial_formation) != 27):
            return Response(
                {'error':
                 'Human initial formation must be a list of 27 integers'},
                status=status.HTTP_400_BAD_REQUEST)

        # Validate human initial formation
        if (not game.has_started and
                sorted(human_initial_formation) != sorted(game.ai_initial_formation)):
            return Response({'error': 'Invalid human initial formation'},
                            status=status.HTTP_400_BAD_REQUEST)

        if not game.has_started:
            game.human_initial_formation = human_initial_formation

            blue_formation = (game.human_initial_formation if game.human_color == 'B'
                              else game.ai_initial_formation)
            red_formation = (game.human_initial_formation if game.human_color == 'R'
                             else game.ai_initial_formation)
            match_simulator = MatchSimulator(formations=[blue_formation,
                                                         red_formation],
                                             controllers=[None, None],
                                             save_data=False,
                                             pov=None)
            arbiter_matrix = match_simulator.setup_arbiter_matrix()
            arbiter_board = Board(arbiter_matrix, player_to_move=Player.BLUE,
                                  blue_anticipating=False,
                                  red_anticipating=False)
            relevant_color = Player.BLUE if game.human_color == 'B' else Player.RED
            starting_infostate = Infostate.at_start(
                owner=relevant_color, board=arbiter_board)

            # If the AI is playing as blue, the AI will make the first move
            if game.ai_color == 'B':
                game.has_started = True
                # Let the model choose
                model = None
                if model_name in ["fivelayer", "fivelayer10k", "csd10k"]:
                    model = FiveLayer()
                model.load_state_dict(torch.load(f"./{model_name}.pth"))
                model.eval()

                input_infostate = list(
                    map(int, str(starting_infostate).split(" ")))
                # Convert input_infostate to a PyTorch Tensor
                input_infostate = torch.tensor(
                    input_infostate, dtype=torch.float32)
                # Reshape the input to have an extra dimension
                input_infostate = input_infostate.unsqueeze(
                    0)  # Add a batch dimension
                full_strategy = model(input_infostate)
                # Get the probabilities for each action from the model output
                full_strategy = full_strategy.squeeze(0).tolist()

                fullgame_actions = TimelessBoard.actions()
                valid_actions = starting_infostate.actions()
                player_to_move = "B" if starting_infostate.player_to_move == Player.BLUE else "R"

                strategy = [0.0 for _ in range(len(valid_actions))]

                for action in fullgame_actions:
                    if action not in valid_actions:
                        full_strategy[fullgame_actions.index(action)] = 0.0
                if sum(full_strategy) > 0:
                    full_strategy = [x / sum(full_strategy)
                                     for x in full_strategy]

                for i, action in enumerate(fullgame_actions):
                    if action in valid_actions:
                        strategy[valid_actions.index(
                            action)] = full_strategy[i]
                if sum(strategy) <= 0:
                    strategy = [1/len(valid_actions)
                                for _ in range(len(valid_actions))]

                strategy_copy = copy.deepcopy(strategy)
                # Filter out values below the maximum probability
                max_prob = max(strategy_copy)
                for i, value in enumerate(strategy_copy):
                    if value < max_prob:
                        strategy_copy[i] = 0
                # Renormalize
                normalizing_sum = sum(strategy_copy)
                strategy_copy = [p/normalizing_sum for p in strategy_copy]

                ai_action = random.choices(
                    valid_actions, weights=strategy_copy, k=1)[0]

                next_board = arbiter_board.transition(action=ai_action)
                result = arbiter_board.classify_action_result(action=ai_action,
                                                              new_board=next_board)
                next_infostate = starting_infostate.transition(action=ai_action,
                                                               result=result)
                next_infostate_matrix = Infostate.to_matrix(
                    infostate_board=next_infostate.abstracted_board)

                attack_location = ()
                if result in [Result.WIN, Result.LOSS]:
                    attack_location = (int(ai_action[2]), int(ai_action[3]))
                else:
                    attack_location = ()

                game.current_state = next_board.matrix
                game.current_infostate = next_infostate_matrix
                game.move_list.append(ai_action)
                game.turn_number += 1
                game.player_to_move = 'R' if game.player_to_move == 'B' else 'B'
                game.previous_result = result
                game.previous_action = ai_action
                game.attack_location = attack_location
            else:
                game.current_state = arbiter_board.matrix
                game.current_infostate = starting_infostate.matrix
                game.has_started = True

            game.save()

            game_data = {
                'human_color': game.human_color,
                'ai_color': game.ai_color,
                'has_started': game.has_started,
                'human_initial_formation': game.human_initial_formation,
                'move_list': game.move_list,
                'current_infostate': game.current_infostate,
            }
            return Response(game_data, status=status.HTTP_200_OK)

        if game.has_started:
            human_color = Player.BLUE if game.human_color == 'B' else Player.RED
            player_to_move = Player.BLUE if game.player_to_move == 'B' else Player.RED
            current_board = Board(game.current_state, player_to_move=player_to_move,
                                  blue_anticipating=game.blue_anticipating,
                                  red_anticipating=game.red_anticipating)
            # Convert current infostate matrix to infostate object
            # An InfostatePiece does not use the Ranking.SPY offset,
            # it uses the color attribute instead

            abstract_infostate = []
            # Iterate over the infostate matrix
            for row in game.current_infostate:
                new_row = []
                for col in row:
                    if Ranking.FLAG <= col[0] <= Ranking.SPY:
                        new_row.append(InfostatePiece(color=Player.BLUE,
                                                      rank_floor=col[0],
                                                      rank_ceiling=col[1]))
                    elif Ranking.FLAG + Ranking.SPY <= col[0] <= 2 * Ranking.SPY:
                        new_row.append(InfostatePiece(color=Player.RED,
                                                      rank_floor=col[0] -
                                                      Ranking.SPY,
                                                      rank_ceiling=col[1] - Ranking.SPY))
                    elif col[0] == Ranking.BLANK:
                        new_row.append(InfostatePiece(color=Player.ARBITER,
                                                      rank_floor=col[0],
                                                      rank_ceiling=col[1]))
                abstract_infostate.append(new_row)

            current_infostate = Infostate(abstracted_board=abstract_infostate,
                                          owner=human_color,
                                          player_to_move=player_to_move,
                                          anticipating=False)

            input_move = request.data.get('move')

        if (game.has_started and input_move in current_board.actions()
                and not current_board.is_terminal()):
            next_board = current_board.transition(action=input_move)

            result = current_board.classify_action_result(action=input_move,
                                                          new_board=next_board)

            next_infostate = current_infostate.transition(action=input_move,
                                                          result=result)

            next_infostate_matrix = Infostate.to_matrix(
                infostate_board=next_infostate.abstracted_board)

            attack_location = ()
            if result in [Result.WIN, Result.LOSS]:
                attack_location = (int(input_move[2]), int(input_move[3]))
            else:
                attack_location = ()

            game.move_list.append(input_move)

            game.turn_number += 1
            game.player_to_move = 'R' if game.player_to_move == 'B' else 'B'
            game.previous_result = result
            game.previous_action = input_move
            game.attack_location = attack_location
            game.save()

            if next_board.is_terminal():
                game.has_ended = True

            if not next_board.is_terminal():
                # The AI will now make a move
                model = None
                if model_name in ["fivelayer", "fivelayer10k", "csd10k"]:
                    model = FiveLayer()
                model.load_state_dict(torch.load(f"./{model_name}.pth"))
                model.eval()

                input_infostate = list(
                    map(int, str(next_infostate).split(" ")))
                # Convert input_infostate to a PyTorch Tensor
                input_infostate = torch.tensor(
                    input_infostate, dtype=torch.float32)
                # Reshape the input to have an extra dimension
                input_infostate = input_infostate.unsqueeze(
                    0)  # Add a batch dimension
                full_strategy = model(input_infostate)
                # Get the probabilities for each action from the model output
                full_strategy = full_strategy.squeeze(0).tolist()

                fullgame_actions = TimelessBoard.actions()
                valid_actions = next_infostate.actions()
                player_to_move = "B" if next_infostate.player_to_move == Player.BLUE else "R"

                strategy = [0.0 for _ in range(len(valid_actions))]

                for action in fullgame_actions:
                    if action not in valid_actions:
                        full_strategy[fullgame_actions.index(action)] = 0.0
                if sum(full_strategy) > 0:
                    full_strategy = [x / sum(full_strategy)
                                     for x in full_strategy]

                for i, action in enumerate(fullgame_actions):
                    if action in valid_actions:
                        strategy[valid_actions.index(
                            action)] = full_strategy[i]
                if sum(strategy) <= 0:
                    strategy = [1/len(valid_actions)
                                for _ in range(len(valid_actions))]

                # Filter the actions
                actions_filter = get_actions_filter(next_board, game.previous_action,
                                                    game.previous_result, game.attack_location)
                filtered_actions = actions_filter.filter()
                filtered_strategy = []
                for a, action in enumerate(valid_actions):
                    if action in filtered_actions:
                        filtered_strategy.append(strategy[a])
                normalizing_sum = sum(filtered_strategy)
                if normalizing_sum > 0:
                    filtered_strategy = [
                        p/normalizing_sum for p in filtered_strategy]
                strategy = filtered_strategy

                strategy_copy = copy.deepcopy(strategy)
                # Filter out values below the maximum probability
                max_prob = max(strategy_copy)
                for i, value in enumerate(strategy_copy):
                    if value < max_prob:
                        strategy_copy[i] = 0
                # Renormalize
                normalizing_sum = sum(strategy_copy)
                strategy_copy = [p/normalizing_sum for p in strategy_copy]

                ai_action = random.choices(
                    filtered_actions, weights=strategy_copy, k=1)[0]

                previous_board = copy.deepcopy(next_board)
                previous_infostate = copy.deepcopy(next_infostate)
                next_board = previous_board.transition(action=ai_action)
                result = previous_board.classify_action_result(action=ai_action,
                                                               new_board=next_board)
                next_infostate = previous_infostate.transition(action=ai_action,
                                                               result=result)
                next_infostate_matrix = Infostate.to_matrix(
                    infostate_board=next_infostate.abstracted_board)

                attack_location = ()
                if result in [Result.WIN, Result.LOSS]:
                    attack_location = (int(ai_action[2]), int(ai_action[3]))
                else:
                    attack_location = ()

                game_previous_action = ai_action
                game.previous_result = result
                game.attack_location = attack_location
                game.current_state = next_board.matrix
                game.current_infostate = next_infostate_matrix
                game.move_list.append(ai_action)
                game.turn_number += 1
                game.player_to_move = 'R' if game.player_to_move == 'B' else 'B'

                if next_board.is_terminal():
                    game.has_ended = True

            game.save()
            game_data = {
                'human_color': game.human_color,
                'ai_color': game.ai_color,
                'has_started': game.has_started,
                'has_ended': game.has_ended,
                'human_initial_formation': game.human_initial_formation,
                'move_list': game.move_list,
                'current_infostate': game.current_infostate,
                'turn_number': game.turn_number,
                'player_to_move': game.player_to_move,
            }
            return Response(game_data, status=status.HTTP_200_OK)
        else:
            game_data = {
                'human_color': game.human_color,
                'ai_color': game.ai_color,
                'has_started': game.has_started,
                'has_ended': game.has_ended,
                'human_initial_formation': game.human_initial_formation,
                'move_list': game.move_list,
                'current_infostate': game.current_infostate,
                'turn_number': game.turn_number,
                'player_to_move': game.player_to_move,
            }
            return Response(game_data, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)


class AIFormationView(APIView):

    def get(self, request, *args, **kwargs):
        return Response(Player.get_sensible_random_formation(
            Ranking.SORTED_FORMATION))


class AnalysisView(APIView):

    def post(self, request, *args, **kwargs):

        model_name = request.data.get('model_name')
        infostate_matrix = request.data.get('infostate_matrix')
        color = request.data.get('color')
        player_to_move = request.data.get('player_to_move')
        anticipating = request.data.get('anticipating')
        player_move = request.data.get('player_move')
        move_result = request.data.get('move_result')

        if model_name is None:
            return Response({'error': 'Model name is required'},
                            status=status.HTTP_400_BAD_REQUEST)

        if infostate_matrix is None:
            return Response({'error': 'Infostate matrix is required'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Create matrix with InfostatePiece objects
        abstract_matrix = []
        for row in infostate_matrix:
            new_row = []
            for col in row:
                if Ranking.FLAG <= col[0] <= Ranking.SPY:
                    new_row.append(InfostatePiece(color=Player.BLUE,
                                                  rank_floor=col[0],
                                                  rank_ceiling=col[1]))
                elif Ranking.FLAG + Ranking.SPY <= col[0] <= 2 * Ranking.SPY:
                    new_row.append(InfostatePiece(color=Player.RED,
                                                  rank_floor=col[0] -
                                                  Ranking.SPY,
                                                  rank_ceiling=col[1] - Ranking.SPY))
                elif col[0] == Ranking.BLANK:
                    new_row.append(InfostatePiece(color=Player.ARBITER,
                                                  rank_floor=col[0],
                                                  rank_ceiling=col[1]))
            abstract_matrix.append(new_row)

        owner = Player.BLUE if color == 'B' else Player.RED
        player_to_move = Player.BLUE if player_to_move == 'B' else Player.RED

        infostate = Infostate(abstracted_board=abstract_matrix,
                              owner=owner,
                              player_to_move=player_to_move,
                              anticipating=anticipating)

        if player_move is not None and move_result is not None:
            result = None  # Initialize the result
            if move_result == "occupy":
                result = Result.OCCUPY
            elif move_result == "win":
                result = Result.WIN
            elif move_result == "draw":
                result = Result.DRAW
            elif move_result == "loss":
                result = Result.LOSS

            if player_move in infostate.actions():
                infostate = infostate.transition(action=player_move,
                                                 result=result)

        # Obtain inference from the model
        model = None
        if model_name in ["fivelayer", "fivelayer10k", "csd10k"]:
            model = FiveLayer()
        model.load_state_dict(torch.load(f"./{model_name}.pth"))
        model.eval()

        input_infostate = list(map(int, str(infostate).split(" ")))
        # Convert input_infostate to a PyTorch Tensor
        input_infostate = torch.tensor(input_infostate, dtype=torch.float32)
        # Reshape the input to have an extra dimension
        input_infostate = input_infostate.unsqueeze(0)  # Add a batch dimension
        full_strategy = model(input_infostate)
        # Get the probabilities for each action from the model output
        full_strategy = full_strategy.squeeze(0).tolist()

        fullgame_actions = TimelessBoard.actions()
        valid_actions = infostate.actions()
        anticipating = infostate.anticipating
        player_to_move = "B" if infostate.player_to_move == Player.BLUE else "R"
        new_infostate_matrix = Infostate.to_matrix(
            infostate_board=infostate.abstracted_board)

        if infostate.player_to_move == infostate.owner:
            strategy = [0.0 for _ in range(len(valid_actions))]

            for action in fullgame_actions:
                if action not in valid_actions:
                    full_strategy[fullgame_actions.index(action)] = 0.0
            if sum(full_strategy) > 0:
                full_strategy = [x / sum(full_strategy) for x in full_strategy]

            for i, action in enumerate(fullgame_actions):
                if action in valid_actions:
                    strategy[valid_actions.index(action)] = full_strategy[i]
            if sum(strategy) <= 0:
                strategy = [1/len(valid_actions)
                            for _ in range(len(valid_actions))]

            sampled_action = random.choices(valid_actions, weights=strategy,
                                            k=1)[0]

            return Response({'strategy': dict(zip(valid_actions, strategy)),
                             'sampled_action': sampled_action,
                            'infostate_matrix': new_infostate_matrix,
                             'anticipating': anticipating,
                             'player_to_move': player_to_move, },
                            status=status.HTTP_200_OK)
        else:
            return Response({'strategy': {},
                            'sampled_action': None,
                             'infostate_matrix': new_infostate_matrix,
                             'anticipating': anticipating,
                             'player_to_move': player_to_move, },
                            status=status.HTTP_200_OK)
