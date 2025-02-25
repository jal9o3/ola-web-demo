import secrets
from django.shortcuts import render

# session/views.py

from rest_framework import generics
from .models import Player, Game, Move, GameSession
from .serializers import PlayerSerializer, GameSerializer, MoveSerializer, GameSessionSerializer


class PlayerListCreateView(generics.ListCreateAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


class PlayerRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


class GameListCreateView(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class GameRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class MoveListCreateView(generics.ListCreateAPIView):
    queryset = Move.objects.all()
    serializer_class = MoveSerializer


class MoveRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Move.objects.all()
    serializer_class = MoveSerializer


class GameSessionListCreateView(generics.ListCreateAPIView):
    queryset = GameSession.objects.all()
    serializer_class = GameSessionSerializer


class GameSessionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GameSession.objects.all()
    serializer_class = GameSessionSerializer

def generate_access_key():
    return secrets.token_urlsafe(32)

class GameSessionCreateView(generics.CreateAPIView):
    queryset = GameSession.objects.all()
    serializer_class = GameSessionSerializer

    def perform_create(self, serializer):
        # Create anonymous Player objects if not provided
        player1, _ = Player.objects.get_or_create(name='Anonymous Player 1')
        player2, _ = Player.objects.get_or_create(name='Anonymous Player 2')

        # Create a new Game object
        game = Game.objects.create(
            player1=player1,
            player2=player2,
            player1_initial_formation={},
            player2_initial_formation={}
        )

        access_key = generate_access_key()

        # Save the GameSession with the created Game object and anonymous players
        serializer.save(player1=player1, player2=player2, game=game, access_key=access_key, name='Anonymous Game Session')
