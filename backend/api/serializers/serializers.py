from rest_framework import serializers
from api.models import User, Subscription

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ('user_id', 'created_at', 'updated_at')

class SubscriptionSerializer(serializers.ModelSerializer):
    FREE_TRIAL = "free_trial"
    SUBSCRIPTION = "subscription"
    VALID_TYPES = [FREE_TRIAL, SUBSCRIPTION]

    class Meta:
        model = Subscription
        fields = '__all__'
        read_only_fields = ('subscription_id','user_id', 'created_at', 'updated_at')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.pop('user_id', None)
        return {
            "subscription_id": data["subscription_id"],
            "name": data["name"],
            "description": data["description"],
            "payment_date": data.get("payment_date"),            
            "visual": {
                "icon": data.get("icon"),
                "colour": data.get("colour")
            },
            "amount": {
                    "currency": data.get("currency"),
                    "price": data.get("price")
                },
            "billing": {
                "type": data["type"],
                "recurring": data.get("recurring"),
                "cycle": data.get("cycle"),
                "frequency": data.get("frequency"),               
            },
            "category": data.get("category"),
            "reminder": data.get("reminder"),
            "timestamps":{
                "created_at": data["created_at"],
                "updated_at": data["updated_at"],
            },
        }


    def validate(self,data):
        # Use existing instance values for PATCH
        # sub_type = data.get('type') if 'type' in data else getattr(self.instance, 'type', None)
        # recurring = data.get('recurring') if 'recurring' in data else getattr(self.instance, 'recurring', None)
        # cycle = data.get('cycle') if 'cycle' in data else getattr(self.instance, 'cycle', None)
        # frequency = data.get('frequency') if 'frequency' in data else getattr(self.instance, 'frequency', None)

        sub_type = self._get_value(data, 'type')
        recurring = self._get_value(data, 'recurring')
        cycle = self._get_value(data, 'cycle')
        frequency = self._get_value(data, 'frequency')
        

        if sub_type not in self.VALID_TYPES: # Check type is existing and correct
            raise serializers.ValidationError(f"Invalid type '{sub_type}'. Must be one of {self.VALID_TYPES}.")

        if sub_type == self.FREE_TRIAL: 
            # Only error if client explicitly tries to send values
            for field in ['recurring', 'cycle', 'frequency']:
                if field in data and data[field] is not None:
                    raise serializers.ValidationError({
                        field: ["must be null for free trials."]
                    })
            
            # To reset any existing subscription related values on PATCH requests for data consistency
            data['recurring'] = None
            data['cycle'] = None
            data['frequency'] = None

        elif sub_type == self.SUBSCRIPTION:
            # Unlimited subscription type
            if recurring is True:
                self._validate_unlimited_subscription(cycle, frequency)
            
            # Limited subscription type
            elif recurring is False:
                self._validate_limited_subscription(cycle, frequency)
            
            # Recurring null value
            else:
                raise serializers.ValidationError("Subscription must specify whether it is recurring or not.")

        return data

    def _get_value(self, data, field):
        return data[field] if field in data else getattr(self.instance, field, None)

    def _validate_unlimited_subscription(self, cycle, frequency):
        if not cycle:
            raise serializers.ValidationError({"cycle": "Recurring unlimited subscription should have a cycle."})
        if frequency is not None:
            raise serializers.ValidationError({"frequency": "Recurring unlimited subscription should not have a frequency."})

    def _validate_limited_subscription(self, cycle, frequency):
        if not cycle or not frequency:
            raise serializers.ValidationError({
                "non_field_errors": ["Recurring limited subscription must include BOTH cycle and frequency."]
            })