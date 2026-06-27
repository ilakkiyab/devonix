# Agent Name: Hexagonal Architecture Agent
# Timestamp: 2023-10-05 14:30:00
# Employee ID: HA-001

from domain.model import UserSubscription

class UserSubscriptionRepository:
    def __init__(self):
        self.subscriptions = {}
    
    def add_subscription(self, subscription: UserSubscription):
        self.subscriptions[subscription.user_id] = subscription
    
    def get_subscription(self, user_id: int) -> UserSubscription:
        return self.subscriptions.get(user_id)
    
    def update_subscription(self, user_id: int, new_plan: str, new_end_date: str):
        subscription = self.get_subscription(user_id)
        if subscription:
            subscription.update_subscription(new_plan, new_end_date)
    
    def cancel_subscription(self, user_id: int):
        subscription = self.get_subscription(user_id)
        if subscription:
            subscription.cancel_subscription()
