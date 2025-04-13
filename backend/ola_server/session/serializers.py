"""
This module contains serializers for the VersusAIGame and VersusAISession models.

Classes:
    VersusAIGameSerializer: A serializer for the VersusAIGame model.
    VersusAISessionSerializer: A serializer for the VersusAISession model.
    VersusAISessionListSerializer: A serializer for listing VersusAISession model instances.
"""

from rest_framework import serializers

from .models import VersusAIGame, VersusAISession, ScoreRecord

class ScoreRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScoreRecord
        fields = '__all__'

class VersusAIGameSerializer(serializers.ModelSerializer):
    """
    Serializer for the VersusAIGame model.
    This serializer converts VersusAIGame model instances to and from JSON format.
    It includes all fields of the VersusAIGame model.
    Attributes:
        Meta (class): Meta options for the serializer.
            model (VersusAIGame): The model that is being serialized.
            fields (str): Specifies that all fields of the model should be included in the 
            serialization.
    """

    class Meta:
        """
        Meta class for VersusAIGame serializer.
        Attributes:
            model (type): The model class that is being serialized.
            fields (str): Specifies that all fields in the model should be included in the 
            serialization.
        """

        model = VersusAIGame
        fields = '__all__'


class VersusAISessionSerializer(serializers.ModelSerializer):
    """
    Serializer for the VersusAISession model.
    This serializer converts VersusAISession model instances to and from JSON format.
    It includes all fields of the VersusAISession model.
    Attributes:
        Meta (class): Meta options for the serializer.
            model (VersusAISession): The model that is being serialized.
            fields (str): Specifies that all fields of the model should be included in the 
            serialization.
    """

    class Meta:
        """
        Meta class for VersusAISession serializer.
        Attributes:
            model (type): The model that is being serialized.
            fields (str): Specifies that all fields of the model should be included in the 
            serialization.
        """

        model = VersusAISession
        fields = '__all__'


class VersusAISessionListSerializer(serializers.ModelSerializer):
    """
    Serializer for listing VersusAISession model instances.
    This serializer excludes the 'access_key' field from the VersusAISession model.
    Attributes:
        Meta (class): Meta options for the serializer.
            model (VersusAISession): The model that is being serialized.
            exclude (list): Specifies the fields to be excluded from the serialization.
    """

    class Meta:
        """
        Meta class for VersusAISessionList serializer.
        Attributes:
            model (type): The model that is being serialized.
            exclude (list): Specifies the fields to be excluded from the serialization.
        """

        model = VersusAISession
        exclude = ['access_key']
