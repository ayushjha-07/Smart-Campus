"""Notifications Upgrade and Notification Preferences

Revision ID: 002_notifications_and_preferences
Revises: 001_initial_schema
Create Date: 2026-09-20 01:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = '002_notifications_and_preferences'
down_revision: Union[str, None] = '001_initial_schema'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. Upgrade notifications table
    with op.batch_alter_table('notifications', schema=None) as batch_op:
        batch_op.add_column(sa.Column('priority', sa.String(length=20), nullable=False, server_default='INFO'))
        batch_op.add_column(sa.Column('read_at', sa.DateTime(timezone=True), nullable=True))
        batch_op.add_column(sa.Column('metadata', sa.JSON(), nullable=True))
        batch_op.create_index('ix_notifications_priority', ['priority'], unique=False)
        batch_op.create_index('ix_notifications_notification_type', ['notification_type'], unique=False)

    # 2. Create notification_preferences table
    op.create_table(
        'notification_preferences',
        sa.Column('id', sa.Uuid(), nullable=False),
        sa.Column('user_id', sa.Uuid(), nullable=False),
        sa.Column('email_enabled', sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column('in_app_enabled', sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column('push_enabled', sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column('sound_enabled', sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column('complaint_updates', sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column('department_alerts', sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column('system_announcements', sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column('critical_alerts_only', sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('user_id')
    )
    op.create_index(op.f('ix_notification_preferences_id'), 'notification_preferences', ['id'], unique=False)
    op.create_index(op.f('ix_notification_preferences_user_id'), 'notification_preferences', ['user_id'], unique=True)


def downgrade() -> None:
    op.drop_index(op.f('ix_notification_preferences_user_id'), table_name='notification_preferences')
    op.drop_index(op.f('ix_notification_preferences_id'), table_name='notification_preferences')
    op.drop_table('notification_preferences')

    with op.batch_alter_table('notifications', schema=None) as batch_op:
        batch_op.drop_index('ix_notifications_notification_type')
        batch_op.drop_index('ix_notifications_priority')
        batch_op.drop_column('metadata')
        batch_op.drop_column('read_at')
        batch_op.drop_column('priority')
