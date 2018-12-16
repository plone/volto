port module ElmBreadcrumbs exposing (main)

import Browser
import Html exposing (Attribute, Html, a, button, div, i, text)
import Html.Attributes exposing (attribute, class, href, title)
import Html.Events exposing (preventDefaultOn)
import Http
import Json.Decode as Json
import String.Extra exposing (rightOf)


main =
    Browser.element { init = init, update = update, view = view, subscriptions = subscriptions }


type alias Model =
    { token : Maybe String
    , apiPath : String
    , pathName : String
    , breadcrumbs : Maybe (List Breadcrumb)
    }


init : { token : String, apiPath : String, pathName : String } -> ( Model, Cmd Msg )
init flags =
    let
        token =
            init_token flags.token

        apiPath =
            flags.apiPath

        pathName =
            flags.pathName

        newModel =
            { token = token
            , apiPath = apiPath
            , pathName = pathName
            , breadcrumbs = Nothing
            }
    in
    ( newModel
    , getBreakcrumbs newModel
    )



-- SUBSCRIPTIONS


port auth_token : (String -> msg) -> Sub msg


port path_name : (String -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ auth_token (\token -> SetToken (init_token token))
        , path_name (\pathName -> SetPathName pathName)
        ]


init_token : String -> Maybe String
init_token token =
    if token == "" then
        Nothing

    else
        Just token


type Msg
    = SetToken (Maybe String)
    | SetPathName String
    | GetBreadcrumbs
    | GotBreadcrumbs (Result Http.Error BreadcrumbsApi)


onClickPD : msg -> Html.Attribute msg
onClickPD msg =
    preventDefaultOn "click" (Json.map alwaysPreventDefault (Json.succeed msg))


alwaysPreventDefault : msg -> ( msg, Bool )
alwaysPreventDefault msg =
    ( msg, True )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetToken token ->
            ( { model | token = token }, Cmd.none )

        SetPathName pathName ->
            let
                newModel =
                    { model | pathName = pathName }
            in
            ( newModel, getBreakcrumbs newModel )

        GetBreadcrumbs ->
            ( model, getBreakcrumbs model )

        GotBreadcrumbs result ->
            case result of
                Ok value ->
                    let
                        breadcrumbs =
                            List.map (relativeBreadcrumb model.apiPath) value.items
                    in
                    ( { model | breadcrumbs = Just breadcrumbs }, Cmd.none )

                Err _ ->
                    ( model, Cmd.none )


relativePath root path =
    rightOf root path


relativeBreadcrumb root breadcrumb =
    let
        id =
            breadcrumb.id
    in
    { breadcrumb | id = relativePath root id }


type alias BreadcrumbsApi =
    { id : String
    , items : List Breadcrumb
    }


type alias Breadcrumb =
    { id : String
    , title : String
    }


breadcrumbsApiDecoder : Json.Decoder BreadcrumbsApi
breadcrumbsApiDecoder =
    Json.map2 BreadcrumbsApi
        (Json.field "@id" Json.string)
        (Json.field "items" (Json.list breadcrumbDecoder))


breadcrumbDecoder : Json.Decoder Breadcrumb
breadcrumbDecoder =
    Json.map2 Breadcrumb
        (Json.field "@id" Json.string)
        (Json.field "title" Json.string)


getBreakcrumbs : Model -> Cmd Msg
getBreakcrumbs model =
    let
        headers =
            case model.token of
                Nothing ->
                    [ Http.header "Accept" "application/json" ]

                Just token ->
                    [ Http.header "Accept" "application/json"
                    , Http.header "Authorization" ("Bearer " ++ token)
                    ]
    in
    Http.request
        { method = "GET"
        , headers = headers
        , url = model.apiPath ++ model.pathName ++ "/@breadcrumbs"
        , expect = Http.expectJson GotBreadcrumbs breadcrumbsApiDecoder
        , body = Http.emptyBody
        , timeout = Nothing
        , tracker = Nothing
        }


tokenToString : Maybe String -> String
tokenToString token =
    case token of
        Nothing ->
            "No token"

        Just value ->
            value


ariaHidden : String -> Attribute msg
ariaHidden name =
    attribute "aria-hidden" name


view : Model -> Html.Html Msg
view model =
    div [ class "ui secondary vertical segment breadcrumbs" ]
        [ div [ class "ui container" ]
            [ div [ class "ui breadcrumb" ] (viewBreadcrumbs model) ]
        ]


viewBreadcrumbs model =
    let
        breadcrumbs =
            model.breadcrumbs

        home =
            a [ class "section", title "Home", href "/" ] [ i [ class "home icon", ariaHidden "true" ] [] ]
    in
    case breadcrumbs of
        Just list ->
            let
                active =
                    list |> List.reverse |> List.head |> viewActive

                links =
                    list |> List.reverse |> List.drop 1 |> List.reverse
            in
            home :: List.concat (List.map viewBreadcrumb links) ++ active

        Nothing ->
            [ home ]


viewActive tail =
    case tail of
        Just breadcrumb ->
            [ div [ class "divider" ] [ text "/" ]
            , div [ class "section active" ] [ text breadcrumb.title ]
            ]

        Nothing ->
            []


viewBreadcrumb breadcrumb =
    [ div [ class "divider" ] [ text "/" ]
    , a [ class "section", href breadcrumb.id ] [ text breadcrumb.title ]
    ]
