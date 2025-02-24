# session/urls.py

from django.urls import path
from .views import (
    PlayerListCreateView,
    PlayerRetrieveUpdateDestroyView,
    GameListCreateView,
    GameRetrieveUpdateDestroyView,
    MoveListCreateView,
    MoveRetrieveUpdateDestroyView,
)

urlpatterns = [
    path('players/', PlayerListCreateView.as_view(), name='player-list-create'),
    path('players/<int:pk>/', PlayerRetrieveUpdateDestroyView.as_view(),
         name='player-detail'),
    path('games/', GameListCreateView.as_view(), name='game-list-create'),
    path('games/<int:pk>/', GameRetrieveUpdateDestroyView.as_view(),
         name='game-detail'),
    path('moves/', MoveListCreateView.as_view(), name='move-list-create'),
    path('moves/<int:pk>/', MoveRetrieveUpdateDestroyView.as_view(),
         name='move-detail'),
]
