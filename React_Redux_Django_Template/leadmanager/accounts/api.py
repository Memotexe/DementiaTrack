from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

#Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

     """
        This function is to allow the user to create an account for the web
        application by taking the information they put into the form
        and plug it into the database.

        Args:
            self: Allows connection to the global variables.
            request:
            *args & **kwargs: *args and **kwargs allow you to pass multiple 
            arguments or keyword arguments to a function.

        Returns:
            the user's info is returned and posted to the server

        Exception:
            If by any means the data put into the form isnt correct,
            the rest framework handles exceptions with the correct errors
            that correspond to said error

    """

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
                "user": UserSerializer(user,
                        context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1]
        })

#Login API

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

     """
        This function is the determanent on whether or not data
        entered into the form is what matches the content in the
        database linked to the account ID given when an account is
        registered

        Args:
            self: Allows connection to the global variables.
            request: is used to get the data from the database that is
            being requested
            *args & **kwargs: *args and **kwargs allow you to pass multiple 
            arguments or keyword arguments to a function.


        Returns:
            True if the it follows the logic.
            False if it doesn't follow.

        Exception:
             If by any means the data put into the form isnt correct,
            the rest framework handles exceptions with the correct errors
            that correspond to said error. Examples could be passwords dont
            match.


    """

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
                "user": UserSerializer(user,
                        context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1]
        })



   
#Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
            permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer


     """
        This function is find out if the user is properly logged into
        an account and if the accounts generated token is true,
        the features of the web app appear

        Args:
            self: Allows connection to the global variables.
           
        Returns:
            the request sent of the user if it is authenticated

        Exception:
            If the token doesnt pass it wont authenticate the user

    """

    def get_object(self):
        return self.request.user


