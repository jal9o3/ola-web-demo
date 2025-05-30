# Generated by Django 5.1.6 on 2025-04-13 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("session", "0008_versusaigame_winner"),
    ]

    operations = [
        migrations.CreateModel(
            name="ScoreRecord",
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
                ("player_name", models.CharField(default="Anonymous", max_length=20)),
                ("turns_taken", models.IntegerField(default=999)),
                ("model_name", models.CharField(default="fivelayer", max_length=20)),
                ("is_fog_mode", models.BooleanField(default=False)),
            ],
        ),
    ]
