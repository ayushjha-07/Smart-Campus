"""Initial Schema for Smart Campus System

Revision ID: 001_initial_schema
Revises: 
Create Date: 2026-09-20 00:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = '001_initial_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. Create departments table
    op.create_table(
        'departments',
        sa.Column('id', sa.Uuid(), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('department_code', sa.String(length=20), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('department_head_id', sa.Uuid(), nullable=True),
        sa.Column('status', sa.String(length=20), nullable=False, server_default='ACTIVE'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_departments_id'), 'departments', ['id'], unique=False)
    op.create_index(op.f('ix_departments_name'), 'departments', ['name'], unique=True)
    op.create_index(op.f('ix_departments_department_code'), 'departments', ['department_code'], unique=True)
    op.create_index(op.f('ix_departments_status'), 'departments', ['status'], unique=False)

    # 2. Create users table
    op.create_table(
        'users',
        sa.Column('id', sa.Uuid(), nullable=False),
        sa.Column('full_name', sa.String(length=120), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('phone', sa.String(length=25), nullable=True),
        sa.Column('password_hash', sa.String(length=255), nullable=False),
        sa.Column('role', sa.String(length=30), nullable=False, server_default='STUDENT'),
        sa.Column('status', sa.String(length=30), nullable=False, server_default='ACTIVE'),
        sa.Column('student_id', sa.String(length=50), nullable=True),
        sa.Column('course', sa.String(length=100), nullable=True),
        sa.Column('branch', sa.String(length=100), nullable=True),
        sa.Column('year', sa.Integer(), nullable=True),
        sa.Column('employee_id', sa.String(length=50), nullable=True),
        sa.Column('designation', sa.String(length=100), nullable=True),
        sa.Column('department_id', sa.Uuid(), nullable=True),
        sa.Column('last_active_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(['department_id'], ['departments.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_student_id'), 'users', ['student_id'], unique=True)
    op.create_index(op.f('ix_users_employee_id'), 'users', ['employee_id'], unique=True)
    op.create_index(op.f('ix_users_role'), 'users', ['role'], unique=False)
    op.create_index(op.f('ix_users_status'), 'users', ['status'], unique=False)

    # Add foreign key from departments.department_head_id to users.id
    bind = op.get_bind()
    if bind and bind.dialect.name == "sqlite":
        with op.batch_alter_table('departments') as batch_op:
            batch_op.create_foreign_key(
                'fk_departments_head_id_users',
                'users',
                ['department_head_id'], ['id'],
                ondelete='SET NULL'
            )
    else:
        op.create_foreign_key(
            'fk_departments_head_id_users',
            'departments', 'users',
            ['department_head_id'], ['id'],
            ondelete='SET NULL'
        )

    # 3. Create complaints table
    op.create_table(
        'complaints',
        sa.Column('id', sa.Uuid(), nullable=False),
        sa.Column('complaint_number', sa.String(length=30), nullable=False),
        sa.Column('title', sa.String(length=200), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('category', sa.String(length=100), nullable=False),
        sa.Column('priority', sa.String(length=20), nullable=False, server_default='MEDIUM'),
        sa.Column('status', sa.String(length=30), nullable=False, server_default='PENDING'),
        sa.Column('location', sa.String(length=200), nullable=True),
        sa.Column('student_id', sa.Uuid(), nullable=False),
        sa.Column('department_id', sa.Uuid(), nullable=True),
        sa.Column('ai_category', sa.String(length=100), nullable=True),
        sa.Column('ai_priority', sa.String(length=50), nullable=True),
        sa.Column('ai_confidence', sa.Float(), nullable=True),
        sa.Column('submitted_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('resolved_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(['student_id'], ['users.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['department_id'], ['departments.id'], ondelete='SET NULL'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_complaints_id'), 'complaints', ['id'], unique=False)
    op.create_index(op.f('ix_complaints_complaint_number'), 'complaints', ['complaint_number'], unique=True)
    op.create_index(op.f('ix_complaints_category'), 'complaints', ['category'], unique=False)
    op.create_index(op.f('ix_complaints_priority'), 'complaints', ['priority'], unique=False)
    op.create_index(op.f('ix_complaints_status'), 'complaints', ['status'], unique=False)

    # 4. Create complaint_updates table
    op.create_table(
        'complaint_updates',
        sa.Column('id', sa.Uuid(), nullable=False),
        sa.Column('complaint_id', sa.Uuid(), nullable=False),
        sa.Column('updated_by', sa.Uuid(), nullable=False),
        sa.Column('status', sa.String(length=50), nullable=False),
        sa.Column('message', sa.Text(), nullable=False),
        sa.Column('is_internal', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(['complaint_id'], ['complaints.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['updated_by'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_complaint_updates_id'), 'complaint_updates', ['id'], unique=False)
    op.create_index(op.f('ix_complaint_updates_complaint_id'), 'complaint_updates', ['complaint_id'], unique=False)

    # 5. Create attachments table
    op.create_table(
        'attachments',
        sa.Column('id', sa.Uuid(), nullable=False),
        sa.Column('complaint_id', sa.Uuid(), nullable=False),
        sa.Column('file_name', sa.String(length=255), nullable=False),
        sa.Column('file_path', sa.String(length=500), nullable=False),
        sa.Column('file_type', sa.String(length=100), nullable=False),
        sa.Column('file_size', sa.Integer(), nullable=False),
        sa.Column('uploaded_by', sa.Uuid(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(['complaint_id'], ['complaints.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['uploaded_by'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_attachments_id'), 'attachments', ['id'], unique=False)
    op.create_index(op.f('ix_attachments_complaint_id'), 'attachments', ['complaint_id'], unique=False)

    # 6. Create notifications table
    op.create_table(
        'notifications',
        sa.Column('id', sa.Uuid(), nullable=False),
        sa.Column('user_id', sa.Uuid(), nullable=False),
        sa.Column('title', sa.String(length=200), nullable=False),
        sa.Column('message', sa.Text(), nullable=False),
        sa.Column('notification_type', sa.String(length=50), nullable=False, server_default='status'),
        sa.Column('is_read', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('complaint_id', sa.Uuid(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(['complaint_id'], ['complaints.id'], ondelete='SET NULL'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_notifications_id'), 'notifications', ['id'], unique=False)
    op.create_index(op.f('ix_notifications_user_id'), 'notifications', ['user_id'], unique=False)
    op.create_index(op.f('ix_notifications_is_read'), 'notifications', ['is_read'], unique=False)


def downgrade() -> None:
    op.drop_table('notifications')
    op.drop_table('attachments')
    op.drop_table('complaint_updates')
    op.drop_table('complaints')
    bind = op.get_bind()
    if bind and bind.dialect.name == "sqlite":
        with op.batch_alter_table('departments') as batch_op:
            batch_op.drop_constraint('fk_departments_head_id_users', type_='foreignkey')
    else:
        op.drop_constraint('fk_departments_head_id_users', 'departments', type_='foreignkey')
    op.drop_table('users')
    op.drop_table('departments')
