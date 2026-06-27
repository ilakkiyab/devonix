# Agent Name: Hexagonal Architecture Agent
# Timestamp: 2023-10-05 14:30:00
# Employee ID: HA-001

class UserSubscription:
    def __init__(self, user_id: int, subscription_plan: str, start_date: str, end_date: str):
        self.user_id = user_id
        self.subscription_plan = subscription_plan
        self.start_date = start_date
        self.end_date = end_date
    
    def update_subscription(self, new_plan: str, new_end_date: str):
        self.subscription_plan = new_plan
        self.end_date = new_end_date
    
    def cancel_subscription(self):
        self.subscription_plan = 'cancelled'
        self.end_date = 'terminated'
