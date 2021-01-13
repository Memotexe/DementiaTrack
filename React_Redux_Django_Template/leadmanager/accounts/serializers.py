from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

#User serialzier
class UserSerializer(serializers.ModelSerializer):
    # """
    # This is used to create a user from the models that are provided
    # by the django user authenitcation system and the rest frameworks
    # serializers.
    # """
    class Meta:
        model=User
        fields = ('id','username','email')

#Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    # """
    # Same as above, this serializer is soley for registering the user
    # so when they are being created we gather the neccesary information 
    # to save.
    # """
    class Meta:
        model=User
        fields=('id','username','email','password')
        extra_kwargs = {'password': {'write_only' : True}}



#     """
#         This function is for creating a user through the rest and django
#         api that will take that data from the form and post it to the server.


#         Args:
#             self: Allows connection to the global variables.
#             validated_data: this is the data that will be saved if it follows the 
#             standards and rules set by the api.

#         Returns:
#             This will return the user with the data that was accepted.

#         Exception:
#             Will properly alert if the data isnt correct and or doesnt
#             match the requirements by the api.
#     """
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return user




#Login Serializer

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

     # """
     #    This function is when the user enters the data of their account
     #    like the username and password and it will check if the credentials match.

     #    Args:
     #        self: Allows connection to the global variables.
     #        data: Data of the information put in the form.
     #    Returns:
     #        Will return the user if the credentials are correct, and false will
     #        return a "Incorrect Credentials" error.
     #    Exception:
     #        Will properly alert if the data isnt correct and or doesnt
     #        match the requirements by the api.
    # """

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
