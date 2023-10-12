"""initial

Revision ID: 62527c0f7577
Revises: 
Create Date: 2023-10-12 12:30:13.471238

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '62527c0f7577'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade():
    op.create_table('feedbacks',
        sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
        sa.Column('feedback_type', sa.VARCHAR(), autoincrement=False, nullable=True),
        sa.Column('description', sa.VARCHAR(), autoincrement=False, nullable=True),
        sa.Column('page_url', sa.VARCHAR(), autoincrement=False, nullable=True),
        sa.Column('created_at', sa.DateTime, autoincrement=False, nullable=True),
        sa.Column('updated_at', sa.DateTime, autoincrement=False, nullable=True),
        sa.PrimaryKeyConstraint('id', name='feedbacks_pkey')
    )

def downgrade():
    op.drop_table('feedbacks')
