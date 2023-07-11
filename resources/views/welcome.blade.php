@extends('layouts.app')

@section('content')
    @component('components.full-page-section')
        @component('components.card')
            @slot('title')
                <span class="icon"><i class="mdi mdi-laravel"></i></span>
                <span>Janith Thenuwara</span>
            @endslot

            <div class="content">
                <p>
                    Hi, this is Single page Laravel Vue app.
                    <br>
                    Please, Select below option to continue&hellip;
                </p>
            </div>
            <hr>
            <div class="buttons">
                <a href="{{ route('login') }}" class="button is-info">Login</a>
                <a href="{{ route('register') }}" class="button is-black is-outlined">Register</a>
            </div>
        @endcomponent
    @endcomponent
@endsection