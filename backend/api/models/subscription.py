from django.db import models

class Subscription(models.Model):
    TYPE_CHOICES = [
        ("free_trial", "Free Trial"),
        ("subscription", "Subscription"),
    ]

    CYCLE_CHOICES = [
        ("daily", "Daily"),
        ("weekly", "Weekly"),
        ("monthly", "Monthly"),
        ("annually", "Annually"),
    ]

    subscription_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey('User', on_delete=models.CASCADE, related_name="subscriptions")
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)  # free trial or subscription
    name = models.CharField(max_length=100)  # name of company
    description = models.TextField(blank=True, null=True)  # extra details
    icon = models.URLField(blank=True, null=True)  # image URL
    colour = models.CharField(max_length=7, blank=True, null=True)  # hex color code
    currency = models.CharField(max_length=10)  # gbp, usd, etc.
    price = models.DecimalField(max_digits=10, decimal_places=2)  # price amount
    payment_date = models.DateField()  # date of payment
    cycle = models.CharField(max_length=20, choices=CYCLE_CHOICES)  # daily, weekly, monthly, annually
    frequency = models.IntegerField()  # number (paired with cycle)
    recurring = models.BooleanField(default=True)  # yes/no
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True, related_name="subscriptions") # categories (id of that category)
    reminder = models.BooleanField(default=False)  # n/a for now
    created_at = models.DateTimeField(auto_now_add=True) # Created time when the subscription is created
    updated_at = models.DateTimeField(auto_now=True) # Updated time whenever the subscription is modified

    def __str__(self):
        return f"{self.name} - {self.user_id.firebase_uid}"



