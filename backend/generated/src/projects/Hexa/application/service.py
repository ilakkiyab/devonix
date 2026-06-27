# Agent Name: Hexagonal Architecture Agent
# Timestamp: 2023-10-05 14:30:00
# Employee ID: HA-001

from domain.repository import UserSubscriptionRepository
from domain.model import UserSubscription

class UserSubscriptionService:
    def __init__(self, repository: UserSubscriptionRepository):
        self.repository = repository
    
    def create_subscription(self, user_id: int, subscription_plan: str, start_date: str, end_date: str):
        subscription = UserSubscription(user_id, subscription_plan, start_date, end_date)
        self.repository.add_subscription(subscription)
    
    def update_subscription(self, user_id: int, new_plan: str, new_end_date: str):
        self.repository.update_subscription(user_id, new_plan, new_end_date)
    
    def cancel_subscription(self, user_id: int):
        self.repository.cancel_subscription(user_id)
