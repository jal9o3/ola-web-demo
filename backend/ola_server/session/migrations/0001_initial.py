# Generated by Django 5.1.6 on 2025-02-26 05:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="VersusAIGame",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("human_color", models.CharField(max_length=1)),
                ("ai_color", models.CharField(max_length=1)),
                ("human_initial_formation", models.JSONField()),
                ("ai_initial_formation", models.JSONField()),
                ("move_list", models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name="VersusAISession",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("is_active", models.BooleanField(default=True)),
                ("access_key", models.CharField(max_length=64)),
                (
                    "game",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="session.versusaigame",
                    ),
                ),
            ],
        ),
    ]
