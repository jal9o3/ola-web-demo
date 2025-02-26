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

        # Randomly assign colors
        colors = ['B', 'R']
        human_color = random.choice(colors)
        ai_color = 'R' if human_color == 'B' else 'B'

        # Generate AI initial formation
        ai_initial_formation = Player.get_random_formation(Ranking.SORTED_FORMATION)

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
