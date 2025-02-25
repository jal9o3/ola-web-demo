# session/urls.py

from django.urls import path
from .views import (
    PlayerListCreateView,
    PlayerRetrieveUpdateDestroyView,
    GameListCreateView,
    GameRetrieveUpdateDestroyView,
    MoveListCreateView,
    MoveRetrieveUpdateDestroyView,
    GameSessionListCreateView,
    GameSessionRetrieveUpdateDestroyView,
    GameSessionCreateView
)

urlpatterns = [
    path('players/', PlayerListCreateView.as_view(), name='player-list-create'),
    path('players/<int:pk>/', PlayerRetrieveUpdateDestroyView.as_view(), name='player-retrieve-update-destroy'),
    path('games/', GameListCreateView.as_view(), name='game-list-create'),
    path('games/<int:pk>/', GameRetrieveUpdateDestroyView.as_view(), name='game-retrieve-update-destroy'),
    path('moves/', MoveListCreateView.as_view(), name='move-list-create'),
    path('moves/<int:pk>/', MoveRetrieveUpdateDestroyView.as_view(), name='move-retrieve-update-destroy'),
    path('sessions/', GameSessionListCreateView.as_view(), name='session-list-create'),
    path('sessions/<int:pk>/', GameSessionRetrieveUpdateDestroyView.as_view(), name='session-retrieve-update-destroy'),
    path('create-session/', GameSessionCreateView.as_view(), name='create-session'),
]
