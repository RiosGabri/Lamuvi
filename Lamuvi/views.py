from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

def cadastrar(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'sucesso.html') 
        else:
            messages.error(request, "Erro: Verifique os dados inseridos.")
    
    return render(request, 'Lamuvi/1_login.html')

