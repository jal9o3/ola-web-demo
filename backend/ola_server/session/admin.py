from django.contrib import admin
from .models import VersusAIGame, VersusAISession, ScoreRecord

admin.site.register(VersusAIGame)
admin.site.register(VersusAISession)
admin.site.register(ScoreRecord)

