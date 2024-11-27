import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  Renderer2,
  RendererStyleFlags2,
  viewChild
} from '@angular/core';
import {
  faComputer,
  faGraduationCap,
  faLocationDot,
  faSchool,
  faShield,
  faTerminal
} from "@fortawesome/free-solid-svg-icons";
import {VitaEntryModel} from "./models/vita-entry.model";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgStyle, UpperCasePipe} from "@angular/common";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {gsap} from "../lib/misc/gsap/gsap";
import {TAILWIND_COLORS} from "../../../tailwind.colors";

@Component({
  selector: 'app-vita',
  imports: [
    FaIconComponent,
    UpperCasePipe,
    NgStyle
  ],
  templateUrl: './vita.component.html'
})
export class VitaComponent implements AfterViewInit, OnDestroy {

  private readonly renderer: Renderer2 = inject(Renderer2);
  private markerIntersectionObserver: IntersectionObserver | undefined;
  private readonly vitaEntriesElement = viewChild.required<ElementRef<HTMLDivElement>>('vitaEntriesElement');

  private readonly highlightColors = [
    TAILWIND_COLORS.vanilla.light,
    TAILWIND_COLORS.vanilla.DEFAULT,
    TAILWIND_COLORS.vanilla.dark,
    TAILWIND_COLORS.vanilla.darker,
    TAILWIND_COLORS.vanilla["extra-dark"]
  ];
  private readonly randomHighlightColorIndex: () => number = gsap.utils.random(0, this.highlightColors.length - 1, 1, true);

  protected readonly faLocationDot: IconDefinition = faLocationDot;
  protected readonly vitaEntries: VitaEntryModel[] = [
    {
      iconDefinition: faShield,
      title: 'Leitung Taskforce Application Security',
      location: 'BEIT GmbH (MERKUR GROUP)',
      titleDescription: 'Latest',
      timePeriod: 'Seit März 2024',
      description: `Neben meiner privaten Leidenschaft für das Lösen von CTFs auf Plattformen wie Hack The Box und
                    beruflichen Fort- und Weiterbildungen zu Security-Themen leite ich die Taskforce Application Security.
                    Ziel dieser ist die <mark><span>kontinuierliche Verbesserung der Sicherheit</span></mark> von
                    bestehenden und neuen Anwendungen, die innerhalb der Unternehmensgruppe entwickelt und betrieben werden.
                    Inhaltlich konzentriert sich die Arbeit der Taskforce unter anderem auf die Begleitung von
                    <mark><span>Penetrationstests</span></mark>, die Evaluierung der Sicherheit verschiedenster
                    <mark><span>System- und Softwarearchitekturen</span></mark> sowie die Ausgestaltung von
                    <mark><span>sicheren Programmierpraktiken</span></mark>.`
    },
    {
      iconDefinition: faTerminal,
      title: 'Webentwickler und -Berater',
      location: 'BEIT GmbH (MERKUR GROUP)',
      titleDescription: 'Latest',
      timePeriod: 'Seit August 2020',
      description: `Während meiner Zeit als Entwickler liegt mein Schwerpunkt auf der Arbeit mit <mark><span>Java</span></mark>,
                    <mark><span>Node.js</span></mark> und <mark><span>verschiedenen Webtechnologien wie PHP</span></mark>.
                    Besonders intensiv beschäftige ich mich mit dem Content-Management-System
                    <mark><span>FirstSpirit</span></mark> und der Portalsoftware <mark><span>Liferay</span></mark>.
                    Im Rahmen meiner Arbeit mit den beiden Systemen betreue ich eine Vielzahl von zentralen
                    Webseiten und -Anwendungen der MERKUR GROUP (früher Gauselmann Gruppe).
                    Zudem entwickelte ich unter Verwendung moderner Webtechnologien wie <mark><span>Angular</span></mark> eine
                    <mark><span>Plattform zur Steuerung, Planung und Durchführung von Rollout-Prozessen</span></mark>.`
    },
    {
      iconDefinition: faGraduationCap,
      title: 'Duales Studium - Bachelor of Science (B.Sc.)',
      location: 'Campus Lingen - HS Osnabrück',
      timePeriod: 'August 2017 - Juli 2020',
      description: `Während meines Studiums der Wirtschaftsinformatik beschäftigte ich mich neben vielen theoretischen
                    Aspekten im Rahmen einiger Module intensiv mit praktischen Projekten.
                    Dazu gehören unter anderem die Programmierung einer prototypischen iOS-App mit einem Backend zur Steuerung
                    einer DJI-Drohne für eine <mark><span>automatisierte Lagerverwaltung</span></mark>, die <mark><span>Entwicklung eines Chatbots</span></mark> sowie die
                    <mark><span>Programmierung eines Alexa-Skills</span></mark>. Diese Projekte ermöglichten es mir,
                    mein theoretisch erlerntes Wissen anzuwenden und oftmals im Rahmen von Gruppenarbeiten innovative
                    Lösungen zu entwickeln. In den späteren Semestern wählte ich den <mark><span>Schwerpunkt E-Business</span></mark>.<br>
                    Meine Bachelorarbeit umfasste die Konzeption, den Entwurf und die
                    Java-Implementierung einer <mark><span>Erweiterung für ein Content-Management-System</span></mark>.`
    },
    {
      iconDefinition: faComputer,
      title: 'Duales Studium - Fachinformatiker für Systemintegration (FiSi)',
      location: 'BEIT GmbH (MERKUR GROUP)',
      timePeriod: 'August 2017 - Juni 2019',
      description: `Im Rahmen meines Dualen Studiums bei der MERKUR GROUP (früher Gauselmann Gruppe) absolvierte ich eine
                    Ausbildung als Fachinformatiker für Systemintegration. Nach jeder Theoriephase an der Hochschule wechselte
                    ich innerhalb des Unternehmens die Abteilung. So konnte ich vielfältige Einblicke in sowohl administrative
                    Aufgaben als auch in Softwareentwicklungsprozesse gewinnen. Dabei sammelte ich unter anderem Erfahrung mit
                    <mark><span>Datenbanken</span></mark>, <mark><span>Virtualisierungstechnologien</span></mark> und
                    der <mark><span>Individualentwicklung</span></mark>.<br>
                    In meinem Abschlussprojekt beschäftigte ich mich mit der Konzeption und Implementierung einer Lösung für ein
                    <mark><span>Ende-zu-Ende-Monitoring von E-Mail-Infrastrukturen</span></mark>.`
    },
    {
      iconDefinition: faSchool,
      title: 'Abitur',
      location: 'Gymnasium Petershagen',
      timePeriod: 'August 2009 - Juli 2017',
      description: `Schon während meiner Schulzeit entdeckte ich meine Leidenschaft für Informatik,
                    die sich durch einen <mark><span>Informatik-Differenzierungskurs</span></mark> in der Mitteltufe entwickelte und
                    durch ein <mark><span>Praktikum im Bereich der Automatisierungstechnik</span></mark> weiter gefestigt wurde.
                    Zusätzlich war ich neben dem normalen Schulalltag als Administrator im Selbstlernzentrum des Gymnasiums tätig,
                    was mir bereits damals erste wertvolle praktische Erfahrungen einbrachte.
                    In der Oberstufe belegte ich die beiden <mark><span>Leistungskurse Mathematik und Sozialwissenschaften</span></mark>.
                    Insbesondere die Kombination aus meinem Interesse an Zahlen und Logik sowie
                    meinem Verständnis von wirtschaftlichen Zusammenhängen führte dazu, dass ich mich schon während des Abiturs für
                    ein Studium der Wirtschaftsinformatik entschied.`
    },
  ];

  ngAfterViewInit(): void {
    this.markerIntersectionObserver = new IntersectionObserver(entries => {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          const newHighlightColor = this.highlightColors[this.randomHighlightColorIndex()];
          this.renderer.setStyle(entry.target, '--vita-entry-mark-highlight-color-light', `${newHighlightColor}80`, RendererStyleFlags2.DashCase);
          this.renderer.setStyle(entry.target, '--vita-entry-mark-highlight-color-dark', `${newHighlightColor}59`, RendererStyleFlags2.DashCase);
        }

        this.renderer.setStyle(entry.target, '--vita-entry-mark-highlighted', (entry.isIntersecting ? 1 : 0), RendererStyleFlags2.DashCase);
      }
    }, {threshold: 1.0});
    this.vitaEntriesElement().nativeElement.querySelectorAll('mark').forEach((markEntry: HTMLElement) =>
      this.markerIntersectionObserver?.observe(markEntry)
    );
  }

  ngOnDestroy(): void {
    this.markerIntersectionObserver?.disconnect();
  }

}
