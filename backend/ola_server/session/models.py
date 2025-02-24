from django.db import models


class Player(models.Model):
    name = models.CharField(max_length=100)
    # Additional player-related fields can be added here

    def __str__(self):
        return self.name


class Game(models.Model):
    player1 = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name='games_as_player1')
    player2 = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name='games_as_player2')
    player1_initial_formation = models.JSONField()
    player2_initial_formation = models.JSONField()
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Game {self.id} between {self.player1} and {self.player2}"


class Move(models.Model):
    game = models.ForeignKey(
        Game, on_delete=models.CASCADE, related_name='moves')
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    move_number = models.PositiveIntegerField()
    param1 = models.IntegerField()
    param2 = models.IntegerField()
    param3 = models.IntegerField()
    param4 = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('game', 'move_number')

    def __str__(self):
        return f"Move {self.move_number} by {self.player} in Game {self.game.id}"
