from django.shortcuts import render
from django.http import HttpResponse
import datetime
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from trainApp.models import Workout, Base_wkt, Crossfit_wkt, Exercise, Cft_complex
from trainApp.forms import WorkoutModelForm, Base_wktModelForm, Crossfit_wktModelForm, WorkoutSearchForm, ExerciseSearchForm, Cft_complexSearchForm

from trainApp.serializers import WorkoutSerializer, Base_wktSerializer, Crossfit_wktSerializer, ExerciseSerializer, Cft_complexSerializer
from rest_framework import viewsets
# Create your views here.


class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = Workout.objects.all()
        form  = WorkoutSearchForm(self.request.GET)
        if form.is_valid():
            queryset = queryset.filter(name__icontains=form.cleaned_data['name'])
        return queryset
    
class Base_wktViewSet(viewsets.ModelViewSet):
    queryset = Base_wkt.objects.all()
    serializer_class = Base_wktSerializer

class Crossfit_wktViewSet(viewsets.ModelViewSet):
    queryset = Crossfit_wkt.objects.all()
    serializer_class = Crossfit_wktSerializer

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = Exercise.objects.all()
        form  = ExerciseSearchForm(self.request.GET)
        if form.is_valid():
            queryset = queryset.filter(name__icontains=form.cleaned_data['name'])
        return queryset

class Cft_complexViewSet(viewsets.ModelViewSet):
    queryset = Cft_complex.objects.all()
    serializer_class = Cft_complexSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = Cft_complex.objects.all()
        form  = Cft_complexSearchForm(self.request.GET)
        if form.is_valid():
            queryset = queryset.filter(name__icontains=form.cleaned_data['name'])
        return queryset

def index(request): 
    return render(request, 'trainApp/index.html')
    


    
def catalog(request): 
    workout_list = Workout.objects.filter(for_all=1)
    return render(request, 'trainApp/catalog.html',
                    {
                        'workout_list' : workout_list
                    })
                    
def workout_detail(request, pk):
    workout = Workout.objects.get(pk=pk)
    return render(request, 'trainApp/workout_detail.html',
                    {
                        'workout' : workout
                    })
                    
def exercises(request): 
    exercise_list = Exercise.objects.all()
    return render(request, 'trainApp/exercises.html',
                    {
                        'exercise_list' : exercise_list
                    })
def exercise_detail(request, pk):
    exercise = Exercise.objects.get(pk=pk)
    return render(request, 'trainApp/exercise_detail.html',
                    {
                        'exercise' : exercise
                    })
                    
def complexes(request): 
    complex_list = Cft_complex.objects.all()
    return render(request, 'trainApp/complexes.html',
                    {
                        'complex_list' : complex_list
                    })
def complex_detail(request, pk):
    complex = Cft_complex.objects.get(pk=pk)
    return render(request, 'trainApp/complex_detail.html',
                    {
                        'complex' : complex
                    })
                                        

@login_required
def editor(request):
    if request.method == 'POST' and request.is_ajax():
        if 'wrkt_form' in request.POST:
            wrkt_form = WorkoutModelForm(request.POST, prefix='wrkt')
            if wrkt_form.is_valid():
                return render(request, 'trainApp/editor/editor.html', {'wrkt_form': wrkt_form})
        elif 'baseW_form' in request.POST:
            baseW_form = WorkoutModelForm(request.POST, prefix='baseW')
            if baseW_form.is_valid():
                return render(request, 'trainApp/editor/editor.html', {'baseW_form':baseW_form})
        elif 'crssft_form' in request.POST:
            crssft_form = WorkoutModelForm(request.POST, prefix='crssft')
            if crssft_form.is_valid():
                return render(request, 'trainApp/editor/editor.html', {'crssft_form':crssft_form})
        return render(request, 'trainApp/editor/editor.html', {'wrkt_form':wrkt_form, 'baseW_form':baseW_form, 'crssft_form':crssft_form})
 
    else:
        wrkt_form = WorkoutModelForm()
        baseW_form = Base_wktModelForm()
        crssft_form = Crossfit_wktModelForm()
    return render(request, 'trainApp/editor/editor.html', {'wrkt_form': wrkt_form, 
                                                           'baseW_form':baseW_form,
                                                           'crssft_form':crssft_form})
    

 
 
@login_required 
def schedule(request): 
    weekday = datetime.datetime.today().weekday()
    today = datetime.datetime.today()
    weekdays = {
                0: "Понедельник",
                1:  "Вторник",
                2:  "Среда",
                3:  "Четверг",
                4:  "Пятница",
                5:  "Суббота",
                6:  "Воскресенье"
                }
    
    
    week_list = {}
    help = weekday
    for i in range(weekday, weekday + 7):
        if i == 7:
            help = 0
        key = weekdays[help]
        week_list[key] = today.strftime("%d/%m/%Y")
        today = today + datetime.timedelta(days=1)
        help = help + 1
        
    
   
    return render(request, 'trainApp/schedule.html',
                    {
                        'week_list' : week_list
                    })
    

    