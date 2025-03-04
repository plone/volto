# Volto - the default Plone 6 frontend

<img align="right" width="300" alt="Volto logo png" src="./logos/VoltoLogoEra2.png#gh-light-mode-only" />
<img align="right" width="300" alt="Volto logo png" src="./logos/VoltoLogoEra2-dark-mode.png#gh-dark-mode-only" />

[![NPM](https://img.shields.io/npm/v/@plone/volto.svg)](https://www.npmjs.com/package/@plone/volto)
[![Unit Tests](https://github.com/plone/volto/actions/workflows/unit.yml/badge.svg)](https://github.com/plone/volto/actions/workflows/unit.yml)
[![Acceptance Tests](https://github.com/plone/volto/actions/workflows/acceptance.yml/badge.svg)](https://github.com/plone/volto/actions/workflows/acceptance.yml)
[![Build Status Docs](https://github.com/plone/volto/actions/workflows/docs.yml/badge.svg)](https://github.com/plone/volto/actions)

## Introduction

[Volto](https://github.com/plone/volto) is a ReactJS-based frontend for the [Plone](https://plone.org) Content Management System.
It is the default frontend starting with the Plone 6 release.

[Plone](https://plone.org) is a CMS built on Python with more than 20 years of history and experience.

Plone has features that appeal to developers and users alike, such as an intuitive editing interface, customizable content types, hierarchical organization, and a sophisticated permissions model.
This allows you to build anything from simple websites to enterprise-grade intranets.

Volto exposes all these features and communicates with Plone via its [REST API](https://github.com/plone/plone.restapi).

Volto features the Pastanaga editor, a modern block-based content layout editor.
It is extensible and customizable, so you can adapt the default blocks provided to match your requirements, or build new ones to cover them.

Volto is extensible using add-ons.
You can build your own or choose from the community released ones:

- [Volto Add-ons in NPM](https://www.npmjs.com/search?q=keywords%3Avolto-addon%2Cvolto)
- [Volto Awesome](https://github.com/collective/awesome-volto)

## Demo

You can try a Volto online demo at [https://6.demo.plone.org/](https://6.demo.plone.org/)

## Create a Volto project

To start a new project using Volto, follow the [Plone installation documentation](https://6.docs.plone.org/install/install-from-packages.html).

## Documentation

You can find the latest documentation at [https://6.docs.plone.org/](https://6.docs.plone.org/volto/index.html).

For links to trainings and videos, see [Other learning resources](https://6.docs.plone.org/volto/getting-started/others.html).

## Supported Node.js versions

Volto runs using [Node.js](https://nodejs.org/).
We recommend using the current LTS version.

- Node.js 20 LTS: Supported since Volto 17.
- Node.js 18 LTS: Supported since Volto 17.
- Node.js 16: No longer supported. It was supported from Volto 14 - 16.
- Node.js 14: No longer supported. It was supported from Volto 8.8.0 - 16.
- Node.js 12: No longer supported. It was supported from Volto 4 - 15.
- Node.js 10: No longer supported. It was supported from Volto 1 - 12.

## Supported Plone and Python versions

Volto is the default UI for Plone 6.
It will work for all released Plone 6 versions.

For the Plone 5 series, the [latest released version of Plone 5](https://plone.org/download/releases) is recommended.

The versions of Python that are supported in Volto depend on the version of Plone that you use.

| Plone | Python       | Volto        |
| ----- | ------------ | ------------ |
| 6.0   | 3.8-3.11     | 16.0 or 17.0 |
| 5.2   | 2.7, 3.6-3.8 | 15.0         |

## Supported browsers

Volto works well with the current version of any modern browser, including their mobile flavors: Chrome, Firefox, Safari, and Edge.

We do not guarantee that outdated browsers such as Internet Explorer 11 are supported by Volto.

## Known good set of versions for backend packages

On Plone 6, we recommend using the known good set (KGS) of package versions that are specified in the Plone release.

On Plone 5, Volto is currently tested with the following packages pinned to specific versions, and we recommend using the same versions, which are:

-   `plone.restapi` 9.2.0
-   `plone.rest` 3.0.1
-   `plone.volto` 4.1.0

## Volto in Production

Volto is actively developed since 2017 and used in production since 2018 on the following websites:

- [VHS Ehrenamtsportal](https://vhs-ehrenamtsportal.de) (Website to help volunteers that help refugees for the [German Adult Education Association](https://www.dvv-vhs.de/en/home/), developed by [kitconcept GmbH](https://kitconcept.com), 2018)
- [Zeelandia](https://zeelandia.de) (Corporate website for one of the leading bakery ingredients manufacturers in Germany, developed by [kitconcept GmbH](https://kitconcept.com), 2019)
- [Excellence at Humboldt-Universität zu Berlin](https://www.alles-beginnt-mit-einer-frage.de) (Website for the excellence initiative of the [Humboldt University Berlin](https://hu-berlin.de), developed by [kitconcept GmbH](https://kitconcept.com), 2019)
- [Forest Information System for Europe](https://forest.eea.europa.eu) (Thematic website focusing on European forests, developed by [Eau de Web](https://www.eaudeweb.ro), 2019)
- [Industrial Emissions portal for Europe](https://industry.eea.europa.eu) (Thematic website focusing on European industrial emissions, developed by [Eau de Web](https://www.eaudeweb.ro), 2020)
- [Energy Climate Union portal for Europe](https://climate-energy.eea.europa.eu/) (Thematic website focusing on European strides towards mitigating climate change, developed by [Eau de Web](https://www.eaudeweb.ro), 2020)
- [Talke Carrer Website](https://karriere.talke.com/) (Carrer website for [Talke](https://www.talke.com), one of the leading a chemical and petrochemical logistics companies in Germany, developed by [kitconcept GmbH](https://kitconcept.com), 2020)
- [Stradanove](http://www.stradanove.it/) (Website of the Department of Youth Policies of the Municipality of Modena, developed by [RedTurtle](https://redturtle.it), 2020)
- [VisitModena](https://www.visitmodena.it/) (Tourist website of the Municipality of Modena, developed by [RedTurtle](https://redturtle.it), 2020)
- [Study guide at University of Jyväskylä](https://studyguide.jyu.fi/2020/) (Static website where [Volto is used as a headless CMS for authoring additional content](https://tech.blog.jyu.fi/2020/06/plone-volto-hasura-gatsbyjs-mashup/), 2020)
- [Nuova Voce Ecologista](https://nuovavoceecologista.it) (Website of Nuova Voce Ecologista, an Italian green Party, 2020)
- [BISE](https://biodiversity.europa.eu) (Biodiversity Information System for Europe, developed by [Eau de Web](https://www.eaudeweb.ro), 2019)
- [MEDICE Webseite](https://medice.com/de-de) (Website for MEDICE Arzneimittel Pütter GmbH & Co. KG), developed by [Werkbank GmbH](https://werkbank.de/), 2020)
- [Jobfamilie MEDICE](https://jobfamilie.medice.de/de) (Carrer website for MEDICE Arzneimittel Pütter GmbH & Co. KG), developed by [Werkbank GmbH](https://werkbank.de/), 2020)
- [Baccanale Imola](https://www.baccanaleimola.it) (Baccanale is a food fair that happens every year in Imola, Italy. Developed by [RedTurtle](https://redturtle.it), 2020)
- [ResOU](https://resou.osaka-u.ac.jp) (ResOU is introducing official researched releases by the University of Osaka, Japan. Developed by [CMScom](https://www.cmscom.jp), 2020)
- [Humboldt Labor](https://www.humboldt-labor.de/) (The Humboldt Lab is a website where the Humboldt University Berlin presents its latest research projects and findings. Developed by [WLDX](https://wldx.de/) and [kitconcept GmbH](https://kitconcept.com), 2020)
- [Osaka University](https://www.osaka-u.ac.jp/en) (Osaka University is considered one of the most prestigious universities in Japan. Developed by [CMScom](https://www.cmscom.jp), 2021)
- [Comune di Modena](https://www.comune.modena.it/) (Website of the Municipality of Modena. Developed by [RedTurtle](https://redturtle.it), 2020)
- [Comune di Camposanto](https://www.comune.camposanto.mo.it/) (Website of the Municipality of Camposanto. Developed by [RedTurtle](https://redturtle.it), 2021)
- [Comune di Cantagallo](https://www.comune.cantagallo.po.it/) (Website of the Municipality of Cantagallo. Developed by [RedTurtle](https://redturtle.it), 2021)
- [Comune di Vernio](https://www.comune.vernio.po.it/) (Website of the Municipality of Vernio. Developed by [RedTurtle](https://redturtle.it), 2021)
- [Unione dei Comuni della Val Bisenzio](https://www.bisenzio.it/) (Website of the Municipality union of Val Bisenzio. Developed by [RedTurtle](https://redturtle.it), 2021)
- [Comune di Vaiano](https://www.comune.vaiano.po.it/) (Website of the Municipality of Vaiano. Developed by [RedTurtle](https://redturtle.it), 2021)
- [ASP Area Nord](https://www.aspareanord.it/) (Website of the Public company of personal services of the Modena municipalities in the north area. Developed by [RedTurtle](https://redturtle.it), 2021)
- [Comune di San Possidonio](https://www.comune.sanpossidonio.mo.it/) (Website of the Municipality of San Possidonio. Developed by [RedTurtle](https://redturtle.it), 2021)
- [Comune di Mirandola](https://comune.mirandola.mo.it/) (Website of the Municipality of Mirandola. Developed by [RedTurtle](https://redturtle.it), 2021)
- [Comune di Medolla](http://www.comune.medolla.mo.it/) (Website of the Municipality of Medolla. Developed by [RedTurtle](https://redturtle.it), 2021)
- [Camera di Commercio dell'Umbria](https://www.umbria.camcom.it) (Website Chamber of Commerce of Umbria. Developed by [RedTurtle](https://redturtle.it), 2021)
- [Biblioteche Pianura Est](https://bibest.it) (Website of the Associated libraries of eastern plain. Developed by [RedTurtle](https://redturtle.it), 2021)
- [Camera di Commercio di Reggio Emilia](https://www.re.camcom.gov.it/) (Website Chamber of Commerce of Reggio Emilia. Developed by [RedTurtle](https://redturtle.it), 2021)
- [RawMaterial](https://rawmaterial.it/en) (Company's website. Developed by [RawMaterial](https://rawmaterial.it/en), 2021)
- [WISE-Freshwater](https://water.europa.eu/freshwater) (WISE-Freshwater, the Freshwater Information System for Europe. Developed by [Eau de web](https://eaudeweb.ro) for the European Environmental Agency, 2021)
- [EEA-IMSv4](https://www.eea.europa.eu/ims) (EEA Indicator Management System v4. Developed by [Eau de web](https://eaudeweb.ro) for the European Environmental Agency, 2021)
- [Memori](https://memori.ai/en) (Corporate website for Memori, startup specializing in technologies applied to the experience of memory through the development of Artificial Intelligences. Developed by [RawMaterial](https://rawmaterial.it/en), 2021)
- [TwinCreator](https://twincreator.com/en) (TwinCreator allows you to design and train multiple AI’s through simple conversation through NLP. Developed by [RawMaterial](https://rawmaterial.it/en), 2021)
- [MemoryTwin](https://memorytwin.com/en) (Product website, MemoryTwin allows you to create your personal artificial intelligence, able to remember and speak. Developed by [RawMaterial](https://rawmaterial.it/en), 2022)
- [Forschungszentrum Jülich](https://fz-juelich.de) (Website for Forschungzentrum Jülich, which is one of the largest research institutions in Europe, developed by [kitconcept GmbH](https://kitconcept.com), 2022)
- [ILPO](https://ilpo.jyu.fi/) (the registration portal of continuous learning at the University of Jyväskylä. Developed by University of Jyväskylä, 2022)
- [Debabarreneko mankomunitatea](https://debabarrena.eus) (Website of the Commonwealth of Debabarrena, community of municipalities to centralize waste handling services, developed by [CodeSyntax](https://www.codesyntax.com/en), 2022)
- [Debako Udala / Ayuntamiento de Deba](https://www.deba.eus) (Website of the municipality of Deba, developed by [CodeSyntax](https://www.codesyntax.com/en), 2022)
- [Helmholtz-Institut Erlangen-Nürnberg für Erneuerbare Energien (HI-ERN)](https://www.hi-ern.de) (Website for HI ERN, a research institution for renewable energies, developed by [kitconcept GmbH](https://kitconcept.com), 2022)
- [Lanku](https://www.lanku.eus) (Website for Lanku Kultur Zerbitzuak, a company offering cultural services and improvised Basque verse singing sessions across the Basque Country, developed by [CodeSyntax](https://www.codesyntax.com/en), 2023)
- [UEU](https://www.ueu.eus) (Website for Udako Euskal Unibertsitatea, a non-profit University offering all its service only in Basque: courses, publications, ... developed by [CodeSyntax](https://www.codesyntax.com/en), 2023)
- [German Aerospace Center (DLR)](https://www.dlr.de/de) (The German Aerospace Center (DLR) is the Federal Republic of Germany's research center for aeronautics. With more than 10.000 employees and a yearly budget of more than 1 billion euros, it is one of the largest research institutions in Germany, developed by [kitconcept GmbH](https://kitconcept.com), 2023)
- [Leibniz Institute for Science and Mathematics Education (IPN)](https://www.leibniz-ipn.de) (Website of the IPN, a research institute dedicated to issues related to learning and teaching of science, mathematics and computer science in and outside of schools, developed by [Starzel](https://www.starzel.de), 2023)

Please create a new [issue](https://github.com/plone/volto/issues/new) or [pull request](https://github.com/plone/volto/pulls) to add your Volto-site here!

## Contributing to Volto

To contribute to the Volto project by writing code, documentation, translations, and so on, please read [Contributing to Plone](https://6.docs.plone.org/contributing/index.html) and [Contributing to Volto](https://6.docs.plone.org/volto/contributing/index.html).

Since December 2023, this repository has a monorepo structure.
Volto itself is treated as a library and you can find it in the `packages/volto` folder.

## Contributors

<a href="https://github.com/plone/volto/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=plone/volto" />
</a>

## License

MIT License. Copyrights held by the [Plone Foundation](https://plone.org/foundation).

See [LICENSE.md](LICENSE.md) for details.
