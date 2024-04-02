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
It is extensible and customizable, so you can adapt the provided default blocks to meet your requirements, or build new ones.

Volto is extensible using add-ons.
You can build your own or choose from the community released ones:

- [Volto Add-ons in NPM](https://www.npmjs.com/search?q=keywords%3Avolto-addon%2Cvolto)
- [Volto Awesome](https://github.com/collective/awesome-volto)


## Demo

You can try a Volto online demo at [https://demo.plone.org/](https://demo.plone.org/).


## Create a Volto project

To start a new project using Volto, follow the [Plone installation documentation](https://6.docs.plone.org/install/create-project.html).


## Documentation

You can find the latest documentation at [https://6.docs.plone.org/](https://6.docs.plone.org/volto/index.html).

For links to trainings and videos, see [Other learning resources](https://6.docs.plone.org/volto/tutorials/index.html).


## Supported Plone, Python, and Plone REST API versions

See [Plone, Python, and Plone REST API compatibility](https://6.docs.plone.org/volto/contributing/version-policy.html#version-policy-plone-python-and-plone-rest-api-compatibility)

See the [Plone Release Schedule](https://plone.org/download/release-schedule) for details of maintenance and support.


## Supported Node.js versions

See [Node.js version policy](https://6.docs.plone.org/volto/contributing/version-policy.html#version-policy-plone-python-and-plone-rest-api-compatibility).


## Supported browsers

See [Supported browsers](https://6.docs.plone.org/volto/contributing/version-policy.html#version-policy-supported-browsers).


## Contributing

To contribute to the Volto project by writing code, documentation, translations, and so on, please read [Contributing to Plone](https://6.docs.plone.org/contributing/index.html) and [Contributing to Volto](https://6.docs.plone.org/volto/contributing/index.html).

For newcomers to Volto, Plone, or open source software, you must read and follow [First-time contributors](https://6.docs.plone.org/contributing/first-time.html).

Since December 2023, this repository has a monorepo structure.
Volto itself is treated as a library and you can find it in the `packages/volto` folder.


## Contributors

<a href="https://github.com/plone/volto/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=plone/volto" />
</a>


## License

MIT License. Copyrights held by the [Plone Foundation](https://plone.org/foundation).

See [LICENSE.md](LICENSE.md) for details.


## Volto in production

Volto has been actively developed since 2017.
It has been used in production since 2018 on numerous websites.

The authoritative source of the list of Volto websites in production is maintained at [Awesome Volto](https://github.com/collective/awesome-volto#websites-built-with-volto).

The Plone Marketing Team copy-pastes its content on a quarterly basis into [They use Plone 6](https://plone.org/why-plone/they-use-plone/they-use-plone-6).

To ensure your website gets the greatest exposure, add it both to [Awesome Volto](https://github.com/collective/awesome-volto#websites-built-with-volto) and this README.

- [ASP Area Nord](https://www.aspareanord.it/) (Website of the Public company of personal services of the Modena municipalities in the north area. Developed by [RedTurtle](https://www.redturtle.it), 2021)
- [Baccanale Imola](https://www.baccanaleimola.it) (Baccanale is a food fair that happens every year in Imola, Italy. Developed by [RedTurtle](https://www.redturtle.it), 2020)
- [Biblioteche Pianura Est](https://bibest.it/it) (Website of the Associated libraries of eastern plain. Developed by [RedTurtle](https://www.redturtle.it/), 2021)
- [BISE](https://biodiversity.europa.eu) (Biodiversity Information System for Europe, developed by [Eau de Web](https://eaudeweb.ro/), 2019)
- [Camera di Commercio dell'Umbria](https://www.umbria.camcom.it) (Website Chamber of Commerce of Umbria. Developed by [RedTurtle](https://www.redturtle.it), 2021)
- [Camera di Commercio di Reggio Emilia](https://www.emilia.camcom.it) (Website Chamber of Commerce of Reggio Emilia. Developed by [RedTurtle](https://www.redturtle.it), 2021)
- [Comune di Camposanto](https://www.comune.camposanto.mo.it/) (Website of the Municipality of Camposanto. Developed by [RedTurtle](https://www.redturtle.it), 2021)
- [Comune di Cantagallo](https://www.comune.cantagallo.po.it/) (Website of the Municipality of Cantagallo. Developed by [RedTurtle](https://www.redturtle.it), 2021)
- [Comune di Medolla](https://www.comune.medolla.mo.it/) (Website of the Municipality of Medolla. Developed by [RedTurtle](https://www.redturtle.it), 2021)
- [Comune di Mirandola](https://www.comune.mirandola.mo.it/) (Website of the Municipality of Mirandola. Developed by [RedTurtle](https://www.redturtle.it), 2021)
- [Comune di Modena](https://www.comune.modena.it/) (Website of the Municipality of Modena. Developed by [RedTurtle](https://www.redturtle.it), 2020)
- [Comune di San Possidonio](https://www.comune.sanpossidonio.mo.it/) (Website of the Municipality of San Possidonio. Developed by [RedTurtle](https://www.redturtle.it), 2021)
- [Comune di Vaiano](https://www.comune.vaiano.po.it/) (Website of the Municipality of Vaiano. Developed by [RedTurtle](https://www.redturtle.it), 2021)
- [Comune di Vernio](https://www.comune.vernio.po.it/) (Website of the Municipality of Vernio. Developed by [RedTurtle](https://www.redturtle.it), 2021)
- [Debabarreneko mankomunitatea](https://debabarrena.eus/eu) (Website of the Commonwealth of Debabarrena, community of municipalities to centralize waste handling services, developed by [CodeSyntax](https://www.codesyntax.com/en), 2022)
- [Debako Udala / Ayuntamiento de Deba](https://www.deba.eus/eu) (Website of the municipality of Deba, developed by [CodeSyntax](https://www.codesyntax.com/en), 2022)
- [European Environment Agency](https://www.eea.europa.eu/en) (Website of the European Environment Agency. Developed by [Eau de Web](https://eaudeweb.ro), 2023)
- [Energy Climate Union portal for Europe](https://climate-energy.eea.europa.eu/) (Thematic website focusing on European strides towards mitigating climate change, developed by [Eau de Web](https://eaudeweb.ro/), 2020)
- [Excellence at Humboldt-Universität zu Berlin](https://www.alles-beginnt-mit-einer-frage.de) (Website for the excellence initiative of the [Humboldt University Berlin](https://www.hu-berlin.de/de), developed by [kitconcept GmbH](https://kitconcept.com), 2019)
- [Forest Information System for Europe](https://forest.eea.europa.eu) (Thematic website focusing on European forests, developed by [Eau de Web](https://eaudeweb.ro/), 2019)
- [Forschungszentrum Jülich](https://www.fz-juelich.de/de) (Website for Forschungzentrum Jülich, which is one of the largest research institutions in Europe, developed by [kitconcept GmbH](https://kitconcept.com), 2022)
- [German Aerospace Center (DLR)](https://www.dlr.de/de) (The German Aerospace Center (DLR) is the Federal Republic of Germany's research center for aeronautics. With more than 10.000 employees and a yearly budget of more than 1 billion euros, it is one of the largest research institutions in Germany, developed by [kitconcept GmbH](https://kitconcept.com), 2023)
- [Helmholtz-Institut Erlangen-Nürnberg für Erneuerbare Energien (HI-ERN)](https://www.hi-ern.de/de) (Website for HI ERN, a research institution for renewable energies, developed by [kitconcept GmbH](https://kitconcept.com), 2022)
- [Humboldt Labor](https://www.humboldtforum.org/de/programm/dauerangebot/ausstellung/nach-der-natur-14144/) (The Humboldt Lab is a website where the Humboldt University Berlin presents its latest research projects and findings. Developed by [WLDX](https://wldx.de/) and [kitconcept GmbH](https://kitconcept.com), 2020)
- [ILPO](https://ilpo.jyu.fi/) (the registration portal of continuous learning at the University of Jyväskylä. Developed by University of Jyväskylä, 2022)
- [Industrial Emissions portal for Europe](https://industry.eea.europa.eu) (Thematic website focusing on European industrial emissions, developed by [Eau de Web](https://eaudeweb.ro/), 2020)
- [Jobfamilie MEDICE](https://jobfamilie.medice.de/de) (Carrer website for MEDICE Arzneimittel Pütter GmbH & Co. KG), developed by [Werkbank GmbH](https://werkbank.de/), 2020)
- [Lanku](https://www.lanku.eus) (Website for Lanku Kultur Zerbitzuak, a company offering cultural services and improvised Basque verse singing sessions across the Basque Country, developed by [CodeSyntax](https://www.codesyntax.com/en), 2023)
- [Leibniz Institute for Science and Mathematics Education (IPN)](https://www.leibniz-ipn.de/de) (Website of the IPN, a research institute dedicated to issues related to learning and teaching of science, mathematics and computer science in and outside of schools, developed by [Starzel](https://www.starzel.de), 2023)
- [MEDICE Webseite](https://medice.com/de-de) (Website for MEDICE Arzneimittel Pütter GmbH & Co. KG), developed by [Werkbank GmbH](https://werkbank.de/), 2020)
- [Nuova Voce Ecologista](https://nuovavoceecologista.it) (Website of Nuova Voce Ecologista, an Italian green Party, 2020)
- [Osaka University](https://www.osaka-u.ac.jp/en) (Osaka University is considered one of the most prestigious universities in Japan. Developed by [CMScom](https://www.cmscom.jp), 2021)
- [ResOU](https://resou.osaka-u.ac.jp/ja) (ResOU is introducing official researched releases by the University of Osaka, Japan. Developed by [CMScom](https://www.cmscom.jp), 2020)
- [Stradanove](https://www.stradanove.it/) (Website of the Department of Youth Policies of the Municipality of Modena, developed by [RedTurtle](https://www.redturtle.it), 2020)
- [Study guide at University of Jyväskylä](https://studyguide.jyu.fi/2020/en/) (Static website where [Volto is used as a headless CMS for authoring additional content](https://tech.blog.jyu.fi/2020/06/plone-volto-hasura-gatsbyjs-mashup/), 2020)
- [Talke Carrer Website](https://karriere.talke.com/) (Carrer website for [Talke](https://www.talke.com), one of the leading a chemical and petrochemical logistics companies in Germany, developed by [kitconcept GmbH](https://kitconcept.com), 2020)
- [UEU](https://www.ueu.eus) (Website for Udako Euskal Unibertsitatea, a non-profit University offering all its service only in Basque: courses, publications, ... developed by [CodeSyntax](https://www.codesyntax.com/en), 2023)
- [Unione dei Comuni della Val Bisenzio](https://www.bisenzio.it/) (Website of the Municipality union of Val Bisenzio. Developed by [RedTurtle](https://www.redturtle.it), 2021)
- [VHS Ehrenamtsportal](https://vhs-ehrenamtsportal.de) (Website to help volunteers that help refugees for the [German Adult Education Association](https://www.volkshochschule.de/), developed by [kitconcept GmbH](https://kitconcept.com), 2018)
- [VisitModena](https://www.visitmodena.it/it) (Tourist website of the Municipality of Modena, developed by [RedTurtle](https://www.redturtle.it), 2020)
- [WISE-Freshwater](https://water.europa.eu/freshwater) (WISE-Freshwater, the Freshwater Information System for Europe. Developed by [Eau de web](https://eaudeweb.ro) for the European Environmental Agency, 2021)
- [Zeelandia](https://www.zeelandia.de/) (Corporate website for one of the leading bakery ingredients manufacturers in Germany, developed by [kitconcept GmbH](https://kitconcept.com), 2019)


### Open-source websites built with Volto

The following websites have been built with Volto.
You can find their complete source code by following their links.
Please note that complex websites are built on top of Volto add-ons, and most of the time they're just an empty shell for the add-ons.
You should check the dependencies in their `package.json` for more details.

- [Forest Information System for Europe](https://github.com/eea/fise-frontend) - Volto project for [Forest Information System for Europe website](https://forest.eea.europa.eu)
- [Freshwater Information System for Europe](https://github.com/eea/freshwater-frontend) - Volto project for [Freshwater Information System for Europe website](https://water.europa.eu/freshwater)
- [European Industrial Emissions Portal](https://github.com/eea/industry-frontend ) - Volto project for [European Industrial Emissions Portal website](https://industry.eea.europa.eu)
- [Biodiversity Information System for Europe](https://github.com/eea/bise-frontend) - Volto project for [Biodiversity Information System for Europe website](https://biodiversity.europa.eu)
- [EEA Main Website frontend](https://github.com/eea/eea-website-frontend) - Volto project for [European Environment Agency](https://www.eea.europa.eu/en)
- [Climate and energy in the EU](https://github.com/eea/climate-energy-frontend) - Volto project for [Climate and energy in the EU website](https://climate-energy.eea.europa.eu)
- [volto-bise](https://github.com/eea/volto-bise) - A Volto project packaged as an addon. It provides Theming using a razzle.extend.js provided alias.
- [design-volto-theme](https://github.com/RedTurtle/design-volto-theme) Volto theme for Italian Public Administration
- [2021.ploneconf.org](https://github.com/plone/ploneconf.org/tree/2021) - Volto project for [Plone Conference 2021 site](https://2021.ploneconf.org)
- [2022.ploneconf.org](https://github.com/plone/ploneconf.org/tree/2022) - Volto project for [Plone Conference 2022 site](https://2022.ploneconf.org)
- [2023.ploneconf.org](https://github.com/plone/ploneconf.org/tree/2023) - Volto project for [Plone Conference 2023 site](https://2023.ploneconf.org)
- [plone.org.br](https://github.com/plonegovbr/plone.org.br) - Volto project for the [Brazilian Plone Community](https://plone.org.br)
- [nsw-design-system-plone6-kit](https://github.com/pretagov/nsw-design-system-plone6-kit) - NSW Design System Plone 6 Kit Volto project for [NSW.gov.au sites](https://digitalnsw.pretagov.com.au/)
- [volto-centraalmuseum-theme](https://github.com/intk/volto-centraalmuseum-theme) - Volto project for the [Centraal Museum & Rietveld](https://www.centraalmuseum.nl/nl) made for [INTK](https://www.intk.com/en).
- [volto-eea-design-system](https://github.com/eea/volto-eea-design-system) - EEA Design System Plone 6 Kit Volto project for [European Environment Agency web sites](https://eea.github.io/volto-eea-design-system/)
- [volto-eea-website-theme](https://github.com/eea/volto-eea-website-theme) - EEA Plone 6 Volto Theme for [European Environment Agency web sites](https://www.eea.europa.eu/en)
- [volto-eea-kitkat](https://github.com/eea/volto-eea-kitkat) - A known good set of Volto addons to be used within all EEA projects and beyond made for [European Environment Agency](https://www.eea.europa.eu/en)
- [volto-rietveldschroderhuis-theme](https://github.com/intk/volto-rietveldschroderhuis-theme) - Volto project for the [Rietveld Schröder House](https://www.rietveldschroderhuis.nl/en) made for [INTK](https://www.intk.com/en).
- [volto-zeeuwsmuseum-theme](https://github.com/intk/volto-zeeuwsmuseum-theme) - Volto project for the [Zeeuws Museum](https://www.zeeuwsmuseum.nl/en) made for [INTK](https://www.intk.com/en).
