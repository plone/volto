port module Counter exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (preventDefaultOn)
import Json.Decode as Json


main =
    Browser.element { init = init, update = update, view = view, subscriptions = subscriptions }


type alias Model =
    { value : Int
    , token : Maybe String
    }


init : { token : String } -> ( Model, Cmd Msg )
init flags =
    let
        token =
            init_token flags.token
    in
    ( { value = 0, token = token }, Cmd.none )



-- SUBSCRIPTIONS


port auth_token : (String -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions model =
    auth_token (\token -> SetToken (init_token token))


init_token : String -> Maybe String
init_token token =
    if token == "" then
        Nothing

    else
        Just token


type Msg
    = Increment
    | Decrement
    | SetToken (Maybe String)


onClickPD : msg -> Html.Attribute msg
onClickPD msg =
    preventDefaultOn "click" (Json.map alwaysPreventDefault (Json.succeed msg))


alwaysPreventDefault : msg -> ( msg, Bool )
alwaysPreventDefault msg =
    ( msg, True )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            ( { model | value = model.value + 1 }, Cmd.none )

        Decrement ->
            ( { model | value = model.value - 1 }, Cmd.none )

        SetToken token ->
            ( { model | token = token }, Cmd.none )


tokenToString : Maybe String -> String
tokenToString token =
    case token of
        Nothing ->
            "No token"

        Just value ->
            value


view : Model -> Html.Html Msg
view model =
    div []
        [ button [ onClickPD Decrement ] [ text "-" ]
        , div [] [ text (String.fromInt model.value), text (tokenToString model.token) ]
        , button [ onClickPD Increment ] [ text "+" ]
        ]
