"""foreign keys added

Revision ID: 0947ab176c52
Revises: 338d92c45795
Create Date: 2022-11-22 19:16:54.533387

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0947ab176c52'
down_revision = '338d92c45795'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'bookings', 'spots', ['spot_id'], ['id'])
    op.create_foreign_key(None, 'bookings', 'users', ['user_id'], ['id'])
    op.add_column('reviews', sa.Column('spot_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'reviews', 'users', ['user_id'], ['id'])
    op.create_foreign_key(None, 'reviews', 'spots', ['spot_id'], ['id'])
    op.create_foreign_key(None, 'spots', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'spots', type_='foreignkey')
    op.drop_constraint(None, 'reviews', type_='foreignkey')
    op.drop_constraint(None, 'reviews', type_='foreignkey')
    op.drop_column('reviews', 'spot_id')
    op.drop_constraint(None, 'bookings', type_='foreignkey')
    op.drop_constraint(None, 'bookings', type_='foreignkey')
    # ### end Alembic commands ###