from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.index, name = 'index'),
    path('editor/', views.editor, name = 'editor'),
    path('workout/<int:pk>', views.workout_detail, name = 'workout_detail'),
    path('exercise/<int:pk>', views.exercise_detail, name = 'exercise_detail'),
    path('complex/<int:pk>', views.complex_detail, name = 'complex_detail'),
    path('catalog', views.catalog, name = 'catalog'),
    path('schedule', views.schedule, name = 'schedule'),
    path('exercises', views.exercises, name = 'exercises'),
    path('complexes', views.complexes, name = 'complexes'),
    path('user_wkts', views.user_wkts, name = 'user_wkts'),
    path('get_all_ex/<int:pk>', views.get_all_ex, name = 'get_all_ex'),
]
