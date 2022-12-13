from rest_framework import serializers
from trainApp.models import Workout, Base_wkt, Crossfit_wkt, Exercise, Cft_complex

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields ="__all__"

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields ="__all__"
        
class Cft_complexSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cft_complex
        fields ="__all__"
        
class Base_wktSerializer(serializers.ModelSerializer):
    name = WorkoutSerializer()
    exercise = ExerciseSerializer()
    class Meta:
        model = Base_wkt
        fields ="__all__"
      
class Crossfit_wktSerializer(serializers.ModelSerializer):
    name = WorkoutSerializer()
    crf_cmplx = Cft_complexSerializer()
    class Meta:
        model = Crossfit_wkt
        fields ="__all__"
        
        