module ResetCounter exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (preventDefaultOn)
import Json.Decode as Json


main =
    Browser.sandbox { init = 0, update = update, view = view }


type Msg
    = Increment
    | Decrement
    | Reset


onClickPD : msg -> Html.Attribute msg
onClickPD msg =
    preventDefaultOn "click" (Json.map alwaysPreventDefault (Json.succeed msg))


alwaysPreventDefault : msg -> ( msg, Bool )
alwaysPreventDefault msg =
    ( msg, True )


update msg model =
    case msg of
        Increment ->
            model + 1

        Decrement ->
            model - 1

        Reset ->
            0


view model =
    div []
        [ button [ onClickPD Decrement ] [ text "-" ]
        , div [] [ text (String.fromInt model) ]
        , button [ onClickPD Increment ] [ text "+" ]
        , button [ onClickPD Reset ] [ text "Reset" ]
        ]
