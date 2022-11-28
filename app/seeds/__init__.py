from flask.cli import AppGroup
from .users import seed_users, undo_users
from .spots import seed_spots, undo_spots
from .reviews import seed_reviews, undo_reviews
from .spotImages import seed_spotImages, undo_spotImages
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.spots RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.spotImages RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
        undo_users()
        undo_spotImages()
        undo_reviews()
        undo_spots()
    seed_users()
    seed_spotImages()
    seed_reviews()
    seed_spots()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_spots()
    undo_reviews()
    undo_spotImages()
    # Add other undo functions here
