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

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from OLA.core import Player
from OLA.constants import Ranking

from .models import VersusAISession, VersusAIGame
from .serializers import VersusAISessionSerializer, VersusAISessionListSerializer


def generate_access_key():
    """
    Generate a secure access key.
    This function generates a URL-safe, random access key using the `secrets` module.
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


class VersusAISessionView(APIView):
    """
    VersusAISessionView handles the HTTP GET and POST requests for VersusAISession objects.
    Methods:
    - get(self, request, *args, **kwargs): Retrieves all VersusAISession objects and returns them 
    serialized.
    - post(self, request, *args, **kwargs): Creates a new VersusAISession object from the provided 
    data if valid, and returns the serialized data with a status of HTTP 201 Created. If the data is 
    invalid, returns the errors with a status of HTTP 400 Bad Request.
    """

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests to retrieve all VersusAISession objects.
        Args:
            request: The HTTP request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.
        Returns:
            Response: A Response object containing serialized data of all VersusAISession objects.
        """

        sessions = VersusAISession.objects.all()
        serializer = VersusAISessionListSerializer(sessions, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Handle POST requests to create a new VersusAISession.
        This method deserializes the incoming request data using the VersusAISessionSerializer.
        If the data is valid, it saves the new session and returns the serialized data with a
        201 Created status. If the data is invalid, it returns the errors with a 400 Bad Request 
        status.
        Args:
            request (Request): The HTTP request object containing the data to be deserialized.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.
        Returns:
            Response: A Response object containing the serialized data or errors and the appropriate 
            HTTP status code.
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
        ai_initial_formation = Player.get_random_formation(
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


class GameDataView(VersusAISessionView):
    """
    GameDataView handles the HTTP GET and PATCH requests to retrieve and update the game's data for 
    a specific session.
    Methods:
    - get(self, request, *args, **kwargs): Retrieves the game's data for the session if the access 
    key is correct.
    - patch(self, request, *args, **kwargs): Updates the game's data for the session if the access 
    key is correct.
    """

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests to retrieve the game's data for a specific session.
        Args:
            request: The HTTP request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.
        Returns:
            Response: A Response object containing the game's data if the access key is correct, 
            otherwise an error message.
        """
        access_key = request.query_params.get('access_key')
        session_name = request.query_params.get('session_name')

        if not access_key or not session_name:
            return Response({'error': 'Access key and session name are required'},
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
            Response: A Response object containing the updated game's data if the access key is 
            correct, otherwise an error message.
        """
        access_key = request.data.get('access_key')
        session_name = request.data.get('session_name')
        human_initial_formation = request.data.get('human_initial_formation')

        if not access_key or not session_name or human_initial_formation is None:
            return Response(
                {'error': 'Access key, session name, and human initial formation are required'},
                status=status.HTTP_400_BAD_REQUEST)

        if not isinstance(human_initial_formation, list) or len(human_initial_formation) != 27:
            return Response({'error': 'Human initial formation must be a list of 27 integers'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            session = VersusAISession.objects.get(
                access_key=access_key, name=session_name)
        except VersusAISession.DoesNotExist:
            return Response({'error': 'Invalid access key or session name'},
                            status=status.HTTP_404_NOT_FOUND)

        game = session.game

        # Validate human initial formation
        if sorted(human_initial_formation) != sorted(game.ai_initial_formation):
            return Response({'error': 'Invalid human initial formation'},
                            status=status.HTTP_400_BAD_REQUEST)

        game.human_initial_formation = human_initial_formation
        game.save()

        game_data = {
            'human_color': game.human_color,
            'ai_color': game.ai_color,
            'human_initial_formation': game.human_initial_formation,
            'move_list': game.move_list,
        }
        return Response(game_data, status=status.HTTP_200_OK)
