"""
This module defines the models for the Versus AI game and session.

Classes:
    VersusAIGame: Represents a game played between a human and an AI.
        Attributes:
            human_color (CharField): The color assigned to the human player.
            ai_color (CharField): The color assigned to the AI player.
            human_initial_formation (JSONField): The initial formation of the human player.
            ai_initial_formation (JSONField): The initial formation of the AI player.
            move_list (JSONField): The list of moves made during the game.
        Methods:
            __str__: Returns a string representation of the VersusAIGame instance.

    VersusAISession: Represents a session for a Versus AI game.
        Attributes:
            name (CharField): The name of the session.
            game (ForeignKey): The game associated with the session.
            created_at (DateTimeField): The timestamp when the session was created.
            updated_at (DateTimeField): The timestamp when the session was last updated.
            is_active (BooleanField): Indicates whether the session is active.
            access_key (CharField): The access key for the session.
        Methods:
            __str__: Returns a string representation of the VersusAISession instance.

"""
from django.db import models


class VersusAIGame(models.Model):
    """
    A Django model representing a game played against an AI opponent.
    Attributes:
        human_color (str): The color assigned to the human player. Expected to be a single 
        character, B for Blue and R for Red.
        ai_color (str): The color assigned to the AI player. Expected to be a single character,
        B for Blue and R for Red.
        human_initial_formation (dict): The initial formation of the human player's pieces, stored 
        as a JSON object.
        ai_initial_formation (dict): The initial formation of the AI player's pieces, stored as a 
        JSON object.
        move_list (list): A list of moves made during the game, stored as a JSON object.
    Methods:
        __str__(): Returns a string representation of the VersusAIGame instance.
    """
    human_color = models.CharField(max_length=1)
    ai_color = models.CharField(max_length=1)
    human_initial_formation = models.JSONField()
    ai_initial_formation = models.JSONField()
    move_list = models.JSONField()

    def __str__(self):
        return f"Versus AI Game {self.id}"


class VersusAISession(models.Model):
    name = models.CharField(max_length=255)
    game = models.ForeignKey(VersusAIGame, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    access_key = models.CharField(max_length=64)

    def __str__(self):
        return f"Versus AI Session {self.name} for Game {self.game.id}"
