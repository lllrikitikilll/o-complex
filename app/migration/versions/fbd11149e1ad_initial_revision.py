"""Initial revision

Revision ID: fbd11149e1ad
Revises:
Create Date: 2025-05-30 07:07:12.939696

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "fbd11149e1ad"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "session_log",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("search_request", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("session_log")
    # ### end Alembic commands ###
