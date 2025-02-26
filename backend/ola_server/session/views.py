import secrets
from django.shortcuts import render

# session/views.py

from rest_framework import generics


def generate_access_key():
    return secrets.token_urlsafe(32)
