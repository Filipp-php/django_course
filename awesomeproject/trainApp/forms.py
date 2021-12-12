from django import forms
from trainApp.models import Workout, Base_wkt, Crossfit_wkt


class WorkoutSearchForm(forms.Form):
    name = forms.CharField(max_length=255,)
    
class ExerciseSearchForm(forms.Form):
    name = forms.CharField(max_length=255,)
    
class Cft_complexSearchForm(forms.Form):
    name = forms.CharField(max_length=255,)

class WorkoutModelForm(forms.ModelForm):
    name = forms.CharField(label="Название тренировки")
    description = forms.CharField(label="Описание")
    data = forms.DateTimeField(label="Дата тренировки")
    class Meta:
        model = Workout
        fields = "__all__"

class Base_wktModelForm(forms.ModelForm):
    class Meta:
        model = Base_wkt
        fields = "__all__"
        
class Crossfit_wktModelForm(forms.ModelForm):
    class Meta:
        model = Crossfit_wkt
        fields = "__all__"