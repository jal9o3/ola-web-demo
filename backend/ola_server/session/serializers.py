from rest_framework import serializers
from .models import Player
from .models import Move
from .models import Game
from .models import GameSession


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name']


class MoveSerializer(serializers.ModelSerializer):
    player = PlayerSerializer(read_only=True)

    class Meta:
        model = Move
        fields = ['id', 'game', 'player', 'move_number',
                  'param1', 'param2', 'param3', 'param4', 'timestamp']


class GameSerializer(serializers.ModelSerializer):
    player1 = PlayerSerializer(read_only=True)
    player2 = PlayerSerializer(read_only=True)
    moves = MoveSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = ['id', 'player1', 'player2', 'player1_initial_formation',
                  'player2_initial_formation', 'start_time', 'end_time', 'moves']


class GameSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSession
        fields = ['name']
        extra_kwargs = {
            'name': {'required': True}
        }
