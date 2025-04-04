"""
URL configuration for the session app.

This module defines the URL patterns for the session-related views in the ola_server application.

Routes:
    - 'session/': Maps to the VersusAISessionView, which handles the session-related requests.

Imports:
    - path: A function from django.urls used to define URL patterns.
    - VersusAISessionView: A view class from the views module that handles session-related logic.
"""
from django.urls import path

from .views import (VersusAISessionView, GameDataView, AnalysisView, 
                    AIFormationView, VersusAIMatchHistoryView)

urlpatterns = [
    path('sessions/', VersusAISessionView.as_view(), name='versus_ai_sessions'),
    path('sessions/game-data/', GameDataView.as_view(), name='game_data'),
    path('analysis/', AnalysisView.as_view(), name='analysis'),
    path('aiformation/', AIFormationView.as_view(), name='ai_formation'),
    path('history/ai/', VersusAIMatchHistoryView.as_view(), name='VsAIHistory')
]
