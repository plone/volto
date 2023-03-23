import { slateBeforeEach } from '../../../support/volto-slate';

const htmlTable = `
<table width="705" cellpadding="9" cellspacing="0">
	<colgroup><col width="111">

	<col width="384">

	<col width="155">

	</colgroup><tbody><tr valign="top">
		<td width="111" height="6" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">Project
			name </font></font>
			</p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">Description
			</font></font>
			</p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">Website
			</font></font>
			</p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="7" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">REGILIENCE
			</font></font>
			</p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt"><span lang="en-US">The
			Regilience project aims to identify and upscale the most promising
			climate change resilience solutions and will support their
			replication in 10 vulnerable regions in Europe. It will
			communicate about them through channels such as events and
			training; provide tools and guidance; and inspire policymakers,
			organisations, and individuals to become part of the change.</span></font></font></p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="right" style="orphans: 2; widows: 2">
			 <font color="#0563c1"><u><a href="https://regilience.eu/"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://regilience.eu/</span></font></font></a></u></font></p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="7" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">TransformAr</font></font></p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt"><span lang="en-US">TransformAr
			aims to upscale and accelerate transformational adaptation to
			reduce climate-related risk. It addresses water-related risks and
			impacts of climate change through six demonstrator regions and
			communities that will test solutions. </span></font></font>
			</p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font color="#0563c1"><u><a href="https://transformar.eu/"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://transformar.eu/</span></font></font></a></u></font></p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="7" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">IMPETUS</font></font></p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt"><span lang="en-US">IMPETUS
			aims to develop and validate a coherent, multi-scale, multi-level,
			cross-sectoral climate change adaptation framework spanning all 7
			EU biogeographical regions. It will build a robust stakeholder
			community with reliable data and assessment methods to support
			decision and policymaking, empowering communities to take action
			on climate change adaptation. It will also implement and validate
			specific measures to adapt to climate change.</span></font></font></p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font color="#0563c1"><u><a href="https://climate-impetus.eu/"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://climate-impetus.eu/</span></font></font></a></u></font></p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="7" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">ARSINOE</font></font></p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt"><span lang="en-US">ARSINOE
			develops actionable solutions and fosters an innovation ecosystem
			to further climate resilience and enable adaptation to climate
			change across Europe. It connects innovators and end-users in
			different European regions to create novel innovation packages,
			business models, and implementation concepts that promote
			sustainability and growth through European cross fertilisation. It
			develops and tests demonstrators for applicability,
			reproducibility, potential, and effectiveness in nine diverse
			European regions</span></font></font><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">.</span></font></font></p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2; margin-bottom: 0in">
			<font color="#0563c1"><u><a href="https://arsinoe-project.eu/"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://arsinoe-project.eu/</span></font></font></a></u></font></p>
			<p align="left" style="orphans: 2; widows: 2"><br>

			</p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="7" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">CLIMAAX</font></font></p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt">The
			CLIMAAX project aims to accelerate the design and implementation
			of risk management plans for climate adaptation and emergency
			response across Europe. It will provide substantial financial,
			analytical and practical support to regions and communities to
			develop and improve their climate risk assessments through a
			number of activities including a standardised climate risk
			assessment framework, a toolbox with data, models and utilities
			linking global open data archives with local data and procedures,
			five European pilots, financial support to execute a
			context-specific climate risk assessment, online guidance on
			climate risk assessment and a proposal to upscale results.</font></font></p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font color="#0563c1"><u><a href="https://cordis.europa.eu/project/id/101093864"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://cordis.europa.eu/project/id/101093864</span></font></font></a></u></font><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">
			</span></font></font>
			</p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="7" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">R4C</font></font></p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt">The
			Regions4Climate project aims to collaboratively develop and
			demonstrate a socially-just transition to climate resilience. The
			project will create and implement innovations combining
			sociocultural, technological, digital, business, governance, and
			environmental solutions to reduce the vulnerability of European
			regions to the impacts of climate change. It will develop a
			comprehensive Adaptation Framework including a Regional Climate
			Resilience Dashboard for each partner region, and will design,
			deploy and scale up solutions through a twinning approach,
			including 12 demonstration cases across Europe.</font></font></p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font color="#0563c1"><u><a href="https://cordis.europa.eu/project/id/101093873"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://cordis.europa.eu/project/id/101093873</span></font></font></a></u></font></p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="7" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">Pathways2Resilience
			/ PEERS </font></font>
			</p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt">P2R
			takes an innovative, systemic approach to regional climate
			resilience. It will empower at least 100 regions and communities
			to co-design visions of a climate resilient future and
			transformative, locally led pathways and innovation agendas to
			ensure long-term impact through political commitment. The P2R
			consortium brings the combined strength of building specialists
			and monitoring and innovation impact partners</font></font></p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font color="#0563c1"><u><a href="https://pathways2resilience.eu/"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://pathways2resilience.eu/</span></font></font></a></u></font></p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="6" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">RESIST</font></font></p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt">The
			RESIST project will test adaptation solutions to five key climate
			challenges: floods, droughts, heatwaves, wildfires, and soil
			erosion, in four demonstrator regions and eight twinning regions
			across Europe. RESIST involves stakeholder collaboration in
			designing and testing more than one hundred new and innovative
			solutions – adaptation products, regulations, policies and
			methods. RESIST will also develop 12 Graphical Digital Twins
			through immersive technologies, to support decision-making.</font></font></p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font color="#0563c1"><u><a href="https://resist-project.eu/"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://resist-project.eu</span></font></font></a></u></font><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">/</span></font></font></p>
		</td>
	</tr>
</tbody></table>
    `;

const mixedHtml = `<p style="line-height: 108%; margin-bottom: 0.11in">
<font face="Arial, serif">A wide range of EU-funded projects have
completed or are undertaking research and developing innovative
approaches and options for climate adaptation and associated
guidance, tools, data, and case studies to help regional and local
authorities deliver the EU Mission on Adaption to Climate Change,
including:</font></p>
<table width="705" cellpadding="9" cellspacing="0">
	<colgroup><col width="111">

	<col width="384">

	<col width="155">

	</colgroup><tbody><tr valign="top">
		<td width="111" height="6" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">Project
			name </font></font>
			</p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">Description
			</font></font>
			</p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">Website
			</font></font>
			</p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="7" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">REGILIENCE
			</font></font>
			</p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt"><span lang="en-US">The
			Regilience project aims to identify and upscale the most promising
			climate change resilience solutions and will support their
			replication in 10 vulnerable regions in Europe. It will
			communicate about them through channels such as events and
			training; provide tools and guidance; and inspire policymakers,
			organisations, and individuals to become part of the change.</span></font></font></p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="right" style="orphans: 2; widows: 2">
			 <font color="#0563c1"><u><a href="https://regilience.eu/"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://regilience.eu/</span></font></font></a></u></font></p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="7" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">TransformAr</font></font></p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt"><span lang="en-US">TransformAr
			aims to upscale and accelerate transformational adaptation to
			reduce climate-related risk. It addresses water-related risks and
			impacts of climate change through six demonstrator regions and
			communities that will test solutions. </span></font></font>
			</p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font color="#0563c1"><u><a href="https://transformar.eu/"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://transformar.eu/</span></font></font></a></u></font></p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="7" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">IMPETUS</font></font></p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt"><span lang="en-US">IMPETUS
			aims to develop and validate a coherent, multi-scale, multi-level,
			cross-sectoral climate change adaptation framework spanning all 7
			EU biogeographical regions. It will build a robust stakeholder
			community with reliable data and assessment methods to support
			decision and policymaking, empowering communities to take action
			on climate change adaptation. It will also implement and validate
			specific measures to adapt to climate change.</span></font></font></p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font color="#0563c1"><u><a href="https://climate-impetus.eu/"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://climate-impetus.eu/</span></font></font></a></u></font></p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="7" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">ARSINOE</font></font></p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt"><span lang="en-US">ARSINOE
			develops actionable solutions and fosters an innovation ecosystem
			to further climate resilience and enable adaptation to climate
			change across Europe. It connects innovators and end-users in
			different European regions to create novel innovation packages,
			business models, and implementation concepts that promote
			sustainability and growth through European cross fertilisation. It
			develops and tests demonstrators for applicability,
			reproducibility, potential, and effectiveness in nine diverse
			European regions</span></font></font><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">.</span></font></font></p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2; margin-bottom: 0in">
			<font color="#0563c1"><u><a href="https://arsinoe-project.eu/"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://arsinoe-project.eu/</span></font></font></a></u></font></p>
			<p align="left" style="orphans: 2; widows: 2"><br>

			</p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="7" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">CLIMAAX</font></font></p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt">The
			CLIMAAX project aims to accelerate the design and implementation
			of risk management plans for climate adaptation and emergency
			response across Europe. It will provide substantial financial,
			analytical and practical support to regions and communities to
			develop and improve their climate risk assessments through a
			number of activities including a standardised climate risk
			assessment framework, a toolbox with data, models and utilities
			linking global open data archives with local data and procedures,
			five European pilots, financial support to execute a
			context-specific climate risk assessment, online guidance on
			climate risk assessment and a proposal to upscale results.</font></font></p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font color="#0563c1"><u><a href="https://cordis.europa.eu/project/id/101093864"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://cordis.europa.eu/project/id/101093864</span></font></font></a></u></font><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">
			</span></font></font>
			</p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="7" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">R4C</font></font></p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt">The
			Regions4Climate project aims to collaboratively develop and
			demonstrate a socially-just transition to climate resilience. The
			project will create and implement innovations combining
			sociocultural, technological, digital, business, governance, and
			environmental solutions to reduce the vulnerability of European
			regions to the impacts of climate change. It will develop a
			comprehensive Adaptation Framework including a Regional Climate
			Resilience Dashboard for each partner region, and will design,
			deploy and scale up solutions through a twinning approach,
			including 12 demonstration cases across Europe.</font></font></p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font color="#0563c1"><u><a href="https://cordis.europa.eu/project/id/101093873"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://cordis.europa.eu/project/id/101093873</span></font></font></a></u></font></p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="7" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">Pathways2Resilience
			/ PEERS </font></font>
			</p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt">P2R
			takes an innovative, systemic approach to regional climate
			resilience. It will empower at least 100 regions and communities
			to co-design visions of a climate resilient future and
			transformative, locally led pathways and innovation agendas to
			ensure long-term impact through political commitment. The P2R
			consortium brings the combined strength of building specialists
			and monitoring and innovation impact partners</font></font></p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font color="#0563c1"><u><a href="https://pathways2resilience.eu/"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://pathways2resilience.eu/</span></font></font></a></u></font></p>
		</td>
	</tr>
	<tr valign="top">
		<td width="111" height="6" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 11pt">RESIST</font></font></p>
		</td>
		<td width="384" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font face="Calibri, serif"><font size="2" style="font-size: 10pt">The
			RESIST project will test adaptation solutions to five key climate
			challenges: floods, droughts, heatwaves, wildfires, and soil
			erosion, in four demonstrator regions and eight twinning regions
			across Europe. RESIST involves stakeholder collaboration in
			designing and testing more than one hundred new and innovative
			solutions – adaptation products, regulations, policies and
			methods. RESIST will also develop 12 Graphical Digital Twins
			through immersive technologies, to support decision-making.</font></font></p>
		</td>
		<td width="155" style="border: 1px solid #000000; padding: 0in 0.08in"><p align="left" style="orphans: 2; widows: 2">
			<font color="#0563c1"><u><a href="https://resist-project.eu/"><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">https://resist-project.eu</span></font></font></a></u></font><font face="Calibri, serif"><font size="2" style="font-size: 11pt"><span lang="en-GB">/</span></font></font></p>
		</td>
	</tr>
</tbody></table>
<p style="line-height: 108%; margin-bottom: 0.11in"><br>
<br>

</p>
<p style="line-height: 108%; margin-bottom: 0.11in; page-break-before: always">
<font color="#4472c4"><font face="Arial, serif"><font size="3" style="font-size: 12pt"><b>[Subpage
title 6 ] Frequently Asked Questions for the Mission’s Portal </b></font></font></font>
</p>
<ol>
	<li><p style="line-height: 100%; margin-bottom: 0in"><font face="Arial, serif"><b>Who
	are the Charter Signatories? </b></font>
	</p>
</li></ol>
`;

describe('Block Tests: pasting content in table block', () => {
  beforeEach(slateBeforeEach);

  it('should paste text', function () {
    cy.intercept('PATCH', '/**/my-page').as('save');

    // Paste
    cy.getTableSlate(true)
      .focus()
      .click()
      .pasteClipboard('Some Text from Clipboard');

    cy.getTableSlate()
      .focus()
      .click()
      .pasteClipboard('Some Text from Clipboard');

    // Save
    cy.toolbarSave();
    cy.wait('@save');

    // View
    cy.get('.celled.fixed.table thead tr th:first').contains(
      'Some Text from Clipboard',
    );
    cy.get(
      '.celled.fixed.table tbody tr:nth-child(1) td:first-child()',
    ).contains('Some Text from Clipboard');
  });

  it('should paste external text containing html', function () {
    cy.intercept('PATCH', '/**/my-page').as('save');
    // Paste
    cy.getTableSlate(true)
      .focus()
      .click()
      .pasteClipboard(
        '<p>For simplicity, emissions arising (CRF 3B) were presented for all livestock type h CH<sub>4</sub> and N<sub>2</sub>O), e CO<sub>2</sub>e value.single CO<sub>2</sub>e figure.</p>',
      );

    cy.getTableSlate()
      .focus()
      .click()
      .pasteClipboard(
        '<p>For simplicity, emissions arising (CRF 3B) were presented for all livestock type h CH<sub>4</sub> and N<sub>2</sub>O), e CO<sub>2</sub>e value.single CO<sub>2</sub>e figure.</p>',
      );

    // Save
    cy.toolbarSave();
    cy.wait('@save');

    // View
    cy.get('[id="page-document"] p').should('have.length', 2);
  });

  it('should paste a table', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.getSlate().focus().click().pasteClipboard(htmlTable);
    cy.toolbarSave();
    cy.wait('@save');

    cy.get('#page-document tr td').should('have.length', 27);
    cy.get('#page-document tr td:first').should('have.text', 'Project name');
    cy.get('#page-document tr:nth-child(3) td:nth-child(3) a').should(
      'have.text',
      'https://transformar.eu/',
    );
  });

  it('should paste a html containing a table', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.getSlate().focus().click().pasteClipboard(mixedHtml);
    cy.toolbarSave();
    cy.wait('@save');

    cy.get('#page-document p:first').should(
      'have.text',
      'A wide range of EU-funded projects have completed or are undertaking research and developing innovative approaches and options for climate adaptation and associated guidance, tools, data, and case studies to help regional and local authorities deliver the EU Mission on Adaption to Climate Change, including:',
    );
    cy.get('#page-document p b:first').should(
      'have.text',
      '[Subpage title 6 ] Frequently Asked Questions for the Mission’s Portal ',
    );
    cy.get('#page-document ol')
      .should('have.length', 1)
      .should('have.text', 'Who are the Charter Signatories? ');

    cy.get('#page-document p:nth-child(4) br').should('have.length', 2);

    cy.get('#page-document tr th').should('have.length', 3);
    cy.get('#page-document tr td').should('have.length', 24);
    cy.get('#page-document tr th:first').should('have.text', 'Project name');
    cy.get('#page-document tr:nth-child(2) td:nth-child(3) a').should(
      'have.text',
      'https://transformar.eu/',
    );
  });
});
