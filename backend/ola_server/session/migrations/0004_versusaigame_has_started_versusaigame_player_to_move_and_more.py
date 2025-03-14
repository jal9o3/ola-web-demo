# Generated by Django 5.1.6 on 2025-03-14 02:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("session", "0003_versusaigame_current_infostate"),
    ]

    operations = [
        migrations.AddField(
            model_name="versusaigame",
            name="has_started",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="versusaigame",
            name="player_to_move",
            field=models.CharField(default="B", max_length=1),
        ),
        migrations.AddField(
            model_name="versusaigame",
            name="turn_number",
            field=models.IntegerField(default=1),
        ),
    ]
