/**
 * sky.test.ts — SKY-TEST: per-module contract tests for ALL 30 sky modules
 * exported by nature/index.ts after 'river' (original 7 sun/moon/cloud/
 * stars/sunrise/rainbow/lightning + the 23 weather/celestial additions
 * sunset … aurora). Companion to ../icons.test.ts (global registry view)
 * and the fruits/fantasy per-module suites: this file pins the PER-MODULE
 * contract for the sky slice only.
 *
 * CONTRACTS PINNED (every expectation derived independently from the
 * hand-read module sources + the documented svg-icon.ts OUTPUT CONTRACT,
 * then cross-confirmed against scratch probes Temp/sky-test/probe-sky*.ts,
 * run with `npx vite-node Temp/sky-test/<probe>.ts` from the repo root —
 * probes confirm the derivations, they are not blessed as the source):
 *   1. REGISTRY SLICE — svgIcons exposes exactly 207 keys; keys 177..206
 *      (0-based) are the 30 sky names in nature/index.ts order, ending in
 *      'aurora'. Registry names are camelCase (the builtins.ts key set:
 *      sunCloud, crescentMoon, fullMoon, halfMoon, moonStars, shootingStar…).
 *   2. PER-MODULE TABLE + TRIPLE IDENTITY — every module's public triple
 *      (ICON_<NAME>, svg<Name>, <Name>Icon) renders the documented shell
 *      around its own ICON constant byte-exact, resolves through the LIVE
 *      registry under its camelCase name, and the builtins map entry is
 *      the SAME factory object (svgIcons[name] === svg<Name>).
 *   3. XML VALIDITY + CENSUS — exact element counts (paths/circles) and
 *      exact fill-rule="evenodd" census per module; flat-design pair on
 *      every path; no gradient or stroke-family markup anywhere.
 *   4. SIZES — numeric size → px width/height; string size → verbatim;
 *      pinned as FULL expected SVG strings (not width fragments).
 *   5. REACT PARITY — every <Name>Icon renders the IconBase defaults
 *      (16px square, 24×24 grid, currentColor/stroke-none, aria-hidden,
 *      focusable=false) with data-icon carrying the machine (registry)
 *      name, innerHTML === the ICON constant through the same jsdom
 *      serialization (../icons.test.ts serialized() precedent), and
 *      consumer prop overrides spread AFTER the defaults win exactly.
 *   6. HOLE GEOMETRY (explicit evenodd, meaningful negative space):
 *      - moon / halfMoon: body contour + crater hole subpaths ride ONE
 *        evenodd path (holes cut, no opaque underlay).
 *      - fullMoon: disk silhouette circlePath(12,12,8.2) + FOUR crater
 *        hole subpaths in ONE evenodd path — whole-d equality built from
 *        the documented circlePath template (full-moon.ts:17), ZERO
 *        <circle> elements (an opaque disk would fill every crater).
 *      - eclipse: corona = ONE evenodd annulus (outer r 9 sweep-1 +
 *        REVERSED inner r 7.4 sweep-0) and EIGHT flare spikes as a
 *        separate solid path — the whole spike d is reconstructed from
 *        the documented trig contract (tips r 10.9, bases r 6.8, ±14°
 *        spread, toFixed(2)); ZERO occluding <circle> elements (an
 *        opaque disk over the ring would fill the annulus hole).
 *      - moonCloud / moonStars: crescents use the NON-retracing contour
 *        'M10 2A6 6 0 1 0 10 14Q3 8 10 2z' — outer r-6 arc centered
 *        (10,8) between tips (10,2)/(10,14) through the left extreme
 *        (4,8) (large-arc, sweep-0 = counterclockwise down the left
 *        side), closed by the quadratic limb Q(3,8) whose midpoint
 *        B(0.5) = 0.25·(10,14) + 0.5·(3,8) + 0.25·(10,2) = (6.5,8), so
 *        the visible crescent spans x 4..10 / y 2..14 with belly width
 *        2.5 at the midline (single contour, no cancelling arc pair).
 *      - stars: static THREE-sparkle flatPath; crescentMoon: upright
 *        single-contour crescent (one M / one z, no fill-rule).
 */
import { afterEach, describe, expect, it } from 'vitest';
import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { svgIcon } from '../svg-icon';
import type { SvgIconFactory } from '../svg-icon';
import type { IconProps } from '../react';
import { svgIcons } from '../builtins';
// The 30 sky modules in nature/index.ts sub-barrel order — each import
// performs that name's registration side effect AND exports the triple.
import { ICON_SUN, svgSun, SunIcon } from './sun';
import { ICON_MOON, svgMoon, MoonIcon } from './moon';
import { ICON_CLOUD, svgCloud, CloudIcon } from './cloud';
import { ICON_STARS, svgStars, StarsIcon } from './stars';
import { ICON_SUNRISE, svgSunrise, SunriseIcon } from './sunrise';
import { ICON_RAINBOW, svgRainbow, RainbowIcon } from './rainbow';
import { ICON_LIGHTNING, svgLightning, LightningIcon } from './lightning';
import { ICON_SUNSET, svgSunset, SunsetIcon } from './sunset';
import { ICON_SUN_CLOUD, svgSunCloud, SunCloudIcon } from './sun-cloud';
import { ICON_MOON_CLOUD, svgMoonCloud, MoonCloudIcon } from './moon-cloud';
import { ICON_CLOUD_RAIN, svgCloudRain, CloudRainIcon } from './cloud-rain';
import { ICON_CLOUD_DRIZZLE, svgCloudDrizzle, CloudDrizzleIcon } from './cloud-drizzle';
import { ICON_CLOUD_SNOW, svgCloudSnow, CloudSnowIcon } from './cloud-snow';
import { ICON_CLOUD_LIGHTNING, svgCloudLightning, CloudLightningIcon } from './cloud-lightning';
import { ICON_CLOUD_WIND, svgCloudWind, CloudWindIcon } from './cloud-wind';
import { ICON_FOG, svgFog, FogIcon } from './fog';
import { ICON_WIND, svgWind, WindIcon } from './wind';
import { ICON_TORNADO, svgTornado, TornadoIcon } from './tornado';
import { ICON_SNOWFLAKE, svgSnowflake, SnowflakeIcon } from './snowflake';
import { ICON_RAINDROP, svgRaindrop, RaindropIcon } from './raindrop';
import { ICON_UMBRELLA, svgUmbrella, UmbrellaIcon } from './umbrella';
import { ICON_CRESCENT_MOON, svgCrescentMoon, CrescentMoonIcon } from './crescent-moon';
import { ICON_FULL_MOON, svgFullMoon, FullMoonIcon } from './full-moon';
import { ICON_HALF_MOON, svgHalfMoon, HalfMoonIcon } from './half-moon';
import { ICON_MOON_STARS, svgMoonStars, MoonStarsIcon } from './moon-stars';
import { ICON_SHOOTING_STAR, svgShootingStar, ShootingStarIcon } from './shooting-star';
import { ICON_CONSTELLATION, svgConstellation, ConstellationIcon } from './constellation';
import { ICON_COMET, svgComet, CometIcon } from './comet';
import { ICON_ECLIPSE, svgEclipse, EclipseIcon } from './eclipse';
import { ICON_AURORA, svgAurora, AuroraIcon } from './aurora';

// The fixed svg-icon OUTPUT CONTRACT shell every factory prepends to the
// definition content (svg-icon.ts parts array, verbatim attribute order).
const SHELL_OPEN =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">';
const SHELL_CLOSE = '</svg>';

// Shell variants for the SIZE contract: same fixed attribute order with
// width/height resolved from the size option (number → '32px', string
// verbatim). Full strings — no fragment matching.
const shellOpen = (size: string): string =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor">`;

// Offscreen DOM probe (../icons.test.ts serialized() precedent): reads a
// definition string back through the SAME jsdom innerHTML machinery the
// components render through, so React parity compares against the
// documented post-serialization form, not a hand-duplicated literal.
const probe = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const serialized = (markup: string): string => {
    probe.innerHTML = markup;
    return probe.innerHTML;
};

/**
 * The per-module contract table (30 sky rows, nature/index.ts order).
 * census fields = parsed-document element counts (XML validity test);
 * evenodd = exact count of fill-rule="evenodd" attributes on the ICON
 * constant (the explicit-hole guard). fullMoon/eclipse encode the hole-cut
 * composition: body + holes ride ONE evenodd path, ZERO opaque circles.
 */
type SkyContract = {
    name: string;
    icon: string;
    svg: SvgIconFactory;
    component: React.ComponentType<IconProps>;
    paths: number;
    circles: number;
    evenodd: number;
};

const SKY: SkyContract[] = [
    { name: 'sun', icon: ICON_SUN, svg: svgSun, component: SunIcon, paths: 1, circles: 0, evenodd: 0 },
    { name: 'moon', icon: ICON_MOON, svg: svgMoon, component: MoonIcon, paths: 1, circles: 0, evenodd: 1 },
    { name: 'cloud', icon: ICON_CLOUD, svg: svgCloud, component: CloudIcon, paths: 1, circles: 3, evenodd: 0 },
    { name: 'stars', icon: ICON_STARS, svg: svgStars, component: StarsIcon, paths: 1, circles: 0, evenodd: 0 },
    { name: 'sunrise', icon: ICON_SUNRISE, svg: svgSunrise, component: SunriseIcon, paths: 1, circles: 0, evenodd: 0 },
    { name: 'rainbow', icon: ICON_RAINBOW, svg: svgRainbow, component: RainbowIcon, paths: 3, circles: 3, evenodd: 0 },
    { name: 'lightning', icon: ICON_LIGHTNING, svg: svgLightning, component: LightningIcon, paths: 2, circles: 3, evenodd: 0 },
    { name: 'sunset', icon: ICON_SUNSET, svg: svgSunset, component: SunsetIcon, paths: 1, circles: 0, evenodd: 0 },
    { name: 'sunCloud', icon: ICON_SUN_CLOUD, svg: svgSunCloud, component: SunCloudIcon, paths: 5, circles: 4, evenodd: 0 },
    { name: 'moonCloud', icon: ICON_MOON_CLOUD, svg: svgMoonCloud, component: MoonCloudIcon, paths: 2, circles: 0, evenodd: 0 },
    { name: 'cloudRain', icon: ICON_CLOUD_RAIN, svg: svgCloudRain, component: CloudRainIcon, paths: 4, circles: 3, evenodd: 0 },
    { name: 'cloudDrizzle', icon: ICON_CLOUD_DRIZZLE, svg: svgCloudDrizzle, component: CloudDrizzleIcon, paths: 6, circles: 3, evenodd: 0 },
    { name: 'cloudSnow', icon: ICON_CLOUD_SNOW, svg: svgCloudSnow, component: CloudSnowIcon, paths: 4, circles: 3, evenodd: 0 },
    { name: 'cloudLightning', icon: ICON_CLOUD_LIGHTNING, svg: svgCloudLightning, component: CloudLightningIcon, paths: 2, circles: 3, evenodd: 0 },
    { name: 'cloudWind', icon: ICON_CLOUD_WIND, svg: svgCloudWind, component: CloudWindIcon, paths: 4, circles: 3, evenodd: 0 },
    { name: 'fog', icon: ICON_FOG, svg: svgFog, component: FogIcon, paths: 4, circles: 3, evenodd: 0 },
    { name: 'wind', icon: ICON_WIND, svg: svgWind, component: WindIcon, paths: 3, circles: 0, evenodd: 0 },
    { name: 'tornado', icon: ICON_TORNADO, svg: svgTornado, component: TornadoIcon, paths: 1, circles: 0, evenodd: 0 },
    { name: 'snowflake', icon: ICON_SNOWFLAKE, svg: svgSnowflake, component: SnowflakeIcon, paths: 1, circles: 0, evenodd: 0 },
    { name: 'raindrop', icon: ICON_RAINDROP, svg: svgRaindrop, component: RaindropIcon, paths: 1, circles: 0, evenodd: 0 },
    { name: 'umbrella', icon: ICON_UMBRELLA, svg: svgUmbrella, component: UmbrellaIcon, paths: 2, circles: 0, evenodd: 0 },
    { name: 'crescentMoon', icon: ICON_CRESCENT_MOON, svg: svgCrescentMoon, component: CrescentMoonIcon, paths: 1, circles: 0, evenodd: 0 },
    { name: 'fullMoon', icon: ICON_FULL_MOON, svg: svgFullMoon, component: FullMoonIcon, paths: 1, circles: 0, evenodd: 1 },
    { name: 'halfMoon', icon: ICON_HALF_MOON, svg: svgHalfMoon, component: HalfMoonIcon, paths: 1, circles: 0, evenodd: 1 },
    { name: 'moonStars', icon: ICON_MOON_STARS, svg: svgMoonStars, component: MoonStarsIcon, paths: 1, circles: 0, evenodd: 0 },
    { name: 'shootingStar', icon: ICON_SHOOTING_STAR, svg: svgShootingStar, component: ShootingStarIcon, paths: 1, circles: 0, evenodd: 0 },
    { name: 'constellation', icon: ICON_CONSTELLATION, svg: svgConstellation, component: ConstellationIcon, paths: 1, circles: 0, evenodd: 0 },
    { name: 'comet', icon: ICON_COMET, svg: svgComet, component: CometIcon, paths: 1, circles: 1, evenodd: 0 },
    { name: 'eclipse', icon: ICON_ECLIPSE, svg: svgEclipse, component: EclipseIcon, paths: 2, circles: 0, evenodd: 1 },
    { name: 'aurora', icon: ICON_AURORA, svg: svgAurora, component: AuroraIcon, paths: 1, circles: 0, evenodd: 0 },
];

// The exact 30 sky names in nature/index.ts sub-barrel order (camelCase —
// the builtins.ts key contract).
const SKY_KEYS = [
    'sun', 'moon', 'cloud', 'stars', 'sunrise', 'rainbow', 'lightning',
    'sunset', 'sunCloud', 'moonCloud', 'cloudRain', 'cloudDrizzle',
    'cloudSnow', 'cloudLightning', 'cloudWind', 'fog', 'wind', 'tornado',
    'snowflake', 'raindrop', 'umbrella', 'crescentMoon', 'fullMoon',
    'halfMoon', 'moonStars', 'shootingStar', 'constellation', 'comet',
    'eclipse', 'aurora',
];

describe('sky per-module contract (SKY-TEST)', () => {
    afterEach(cleanup);

    it('exposes exactly 207 built-in names with the 30-name camelCase sky slice closing the map at aurora', () => {
        // Total map (generic+fantasy+flags+animals+fruits+nature incl. sky)
        expect(Object.keys(svgIcons).length).toBe(207);
        // The sky slice sits at keys 177..206 (0-based) in nature/index.ts
        // order, and 'aurora' is the LAST name of the whole registry.
        expect(Object.keys(svgIcons).slice(177)).toEqual(SKY_KEYS);
        expect(Object.keys(svgIcons)[206]).toBe('aurora');
    });

    it('renders every module factory as the documented shell around its own definition, byte-exact, with full triple/registry identity', () => {
        for (const row of SKY) {
            // MODULE SELF-CONTAINMENT + OUTPUT CONTRACT (svg-icon.ts):
            // xmlns → viewBox → width="1em" → height="1em" →
            // fill="currentColor", then the module's ICON_<NAME> verbatim.
            expect(row.svg(), `shell composition: ${row.name}`).toBe(
                SHELL_OPEN + row.icon + SHELL_CLOSE
            );
            // REGISTRATION: the name resolvable in the live registry is the
            // camelCase machine name — svgIcon(name) === svg<Name>().
            expect(svgIcon(row.name), `registry resolution: ${row.name}`).toBe(row.svg());
            // TRIPLE/BARREL IDENTITY: the builtins map entry is the SAME
            // factory object the module exports (not a re-bound copy).
            expect(svgIcons[row.name], `map identity: ${row.name}`).toBe(row.svg);
        }
    });

    it('parses every full render as a standalone SVG document with the exact per-module element census', () => {
        for (const row of SKY) {
            const doc = new DOMParser().parseFromString(row.svg(), 'image/svg+xml');
            // XML validity: a <parsererror> report means malformed markup.
            expect(doc.querySelector('parsererror'), `XML validity: ${row.name}`).toBeNull();
            expect(doc.documentElement.tagName).toBe('svg');
            expect(doc.documentElement.getAttribute('viewBox')).toBe('0 0 24 24');
            // EXACT census per module (see table); row-named messages point
            // failures at the exact module.
            expect(
                doc.getElementsByTagName('path').length,
                `path census: ${row.name}`
            ).toBe(row.paths);
            expect(
                doc.getElementsByTagName('circle').length,
                `circle census: ${row.name}`
            ).toBe(row.circles);
            // Flat-design presentation contract on EVERY path element.
            for (const path of Array.from(doc.getElementsByTagName('path'))) {
                expect(path.getAttribute('fill')).toBe('currentColor');
                expect(path.getAttribute('stroke')).toBe('none');
            }
            // No gradient machinery or stroke-family drawing anywhere.
            const markup = row.svg();
            expect(markup.match(/<linearGradient/g)).toBeNull();
            expect(markup.match(/<radialGradient/g)).toBeNull();
            expect(markup.match(/ stroke="currentColor"/g)).toBeNull();
            // EXPLICIT evenodd census (the winding-bug guard): exact count
            // on the definition constant; null is the zero-case absence.
            expect(row.icon.match(/fill-rule="evenodd"/g)).toEqual(
                row.evenodd === 0
                    ? null
                    : new Array(row.evenodd).fill('fill-rule="evenodd"')
            );
        }
    });

    it('resolves numeric and string sizes to FULL expected SVG strings on every string factory', () => {
        for (const row of SKY) {
            // number → px on BOTH width and height, full string equality
            // (svg-icon.ts resolveSize: isNumber → `${size}px`).
            expect(row.svg({ size: 32 })).toBe(shellOpen('32px') + row.icon + SHELL_CLOSE);
            // string → verbatim, full string equality.
            expect(row.svg({ size: '2rem' })).toBe(shellOpen('2rem') + row.icon + SHELL_CLOSE);
        }
    });

    it('renders every component through the exact IconBase shell with the camelCase data-icon and identical geometry', () => {
        for (const row of SKY) {
            const { container } = render(React.createElement(row.component));
            const el = container.querySelector(
                `svg[data-icon="${row.name}"]`
            ) as SVGSVGElement | null;
            // data-icon carries the MACHINE (registry) name — the stable
            // test/integration hook (react.tsx IconBase contract). Row-named
            // message points failures at the exact module.
            expect(el, `data-icon hook: ${row.name}`).not.toBeNull();
            expect(el?.getAttribute('width')).toBe('16');
            expect(el?.getAttribute('height')).toBe('16');
            expect(el?.getAttribute('viewBox')).toBe('0 0 24 24');
            expect(el?.getAttribute('fill')).toBe('currentColor');
            expect(el?.getAttribute('stroke')).toBe('none');
            expect(el?.getAttribute('aria-hidden')).toBe('true');
            expect(el?.getAttribute('focusable')).toBe('false');
            // STRING/REACT PARITY: innerHTML equals the ICON constant
            // serialized through the same jsdom machinery.
            expect(el?.innerHTML).toBe(serialized(row.icon));
        }
    });

    it('applies consumer prop overrides after the IconBase defaults (exact attributes + event wiring)', () => {
        // IconBase spreads svgProps AFTER the fixed defaults (react.tsx), so
        // consumer props win exactly; data-icon sits before the spread —
        // the machine hook stays pinned in the markup unless overridden.
        let clicks = 0;
        const { container } = render(
            React.createElement(SunIcon, {
                size: 24,
                className: 'skyx',
                'aria-hidden': false,
                'data-testid': 'sun-override',
                onClick: () => {
                    clicks += 1;
                },
            })
        );
        const el = container.querySelector('svg[data-icon="sun"]') as SVGSVGElement;
        // Exact post-spread attribute surface.
        expect(el.getAttribute('width')).toBe('24');
        expect(el.getAttribute('height')).toBe('24');
        expect(el.getAttribute('class')).toBe('skyx');
        // aria-hidden override beats the decorative default (spread wins).
        expect(el.getAttribute('aria-hidden')).toBe('false');
        expect(el.getAttribute('data-testid')).toBe('sun-override');
        // Un-overridden defaults persist.
        expect(el.getAttribute('focusable')).toBe('false');
        expect(el.getAttribute('fill')).toBe('currentColor');
        // Event handlers wire through React's synthetic event system.
        fireEvent.click(el);
        expect(clicks).toBe(1);
    });

    it('pins the exact static three-sparkle stars glyph byte-for-byte', () => {
        // stars.ts: ONE flatPath, THREE disjoint four-point sparkles
        // (broad concave shoulders, no retraced diagonal rays) — static
        // literal, probe-verified (Temp/sky-test/probe-sky.ts STARS).
        expect(ICON_STARS).toBe(
            '<path d="M14 1l1.7 5.3L21 8l-5.3 1.7L14 15l-1.7-5.3L7 8l5.3-1.7zM5 12l1.1 3.9L10 17l-3.9 1.1L5 22l-1.1-3.9L0 17l3.9-1.1zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" fill="currentColor" stroke="none"/>'
        );
    });

    it('pins crescentMoon as ONE upright single-contour crescent with no holes', () => {
        // crescent-moon.ts: major arc of the LEFT circle (r 7.4 at
        // (12.6,12)) from the top horn (15,4.9) down the left side to the
        // bottom horn (15,19.1), then the RIGHT circle's minor arc back up
        // — exactly one M, one z, no fill-rule (a single closed contour).
        expect(ICON_CRESCENT_MOON).toBe(
            '<path d="M15 4.9A7.4 7.4 0 1 0 15 19.1A7.4 7.4 0 0 1 15 4.9z" fill="currentColor" stroke="none"/>'
        );
        const d = ICON_CRESCENT_MOON.match(/d="([^"]+)"/) as RegExpMatchArray;
        expect(d[1].match(/M/g)).toEqual(['M']);
        expect(d[1].match(/z/g)).toEqual(['z']);
        expect(ICON_CRESCENT_MOON.match(/fill-rule/g)).toBeNull();
    });

    it('pins the moon crescent contour and its two crater holes inside ONE evenodd path', () => {
        // moon.ts (probe-verified): the crescent body and BOTH crater hole
        // subpaths ride the SAME path element (evenodd cuts them); full
        // string pin.
        expect(ICON_MOON).toBe(
            '<path d="M18.47 16.13A7.9 7.9 0 1 1 9.41 4.95A7.5 7.5 0 0 0 18.47 16.13zM7.3 15a1.3 1.3 0 1 1 2.6 0a1.3 1.3 0 1 1 -2.6 0zM9.7 17.8a0.9 0.9 0 1 1 1.8 0a0.9 0.9 0 1 1 -1.8 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>'
        );
    });

    it('pins the moonCloud non-retracing crescent and the three-lobe cloud as two disjoint single-contour paths', () => {
        // moon-cloud.ts: crescent = ONE contour 'M10 2A6 6 0 1 0 10 14Q3 8
        // 10 2z' — outer arc of the r-6 circle centered (10,8) between the
        // tips (10,2)/(10,14) swept counterclockwise (large 1, sweep 0)
        // through the left extreme (4,8), closed by the quadratic limb with
        // control (3,8) whose midpoint B(0.5) = 0.25·(10,14) + 0.5·(3,8) +
        // 0.25·(10,2) = (6.5,8): visible band x 4..10 / y 2..14, belly 2.5
        // wide at the midline. The cloud (lower right) keeps its
        // three-lobe construction (base line + three arcs right→left).
        expect(ICON_MOON_CLOUD).toBe(
            '<path d="M10 2A6 6 0 1 0 10 14Q3 8 10 2z" fill="currentColor" stroke="none"/>' +
                '<path d="M4.4 18.6H19.6A3.8 3.8 0 0 0 15.9 14.9A3.1 3.1 0 0 0 11.4 13.9A2.9 2.9 0 0 0 4.4 18.6z" fill="currentColor" stroke="none"/>'
        );
    });

    it('pins the halfMoon lit-half contour and its three crater holes inside ONE evenodd path', () => {
        // half-moon.ts (probe-verified): left rim arc r 8 from (12,4)
        // counter-clockwise to (12,20) closed by the straight vertical
        // chord, plus THREE crater hole subpaths in the SAME path.
        expect(ICON_HALF_MOON).toBe(
            '<path d="M12 4A8 8 0 0 0 12 20L12 4zM7.1 9.4a1.5 1.5 0 1 1 3 0a1.5 1.5 0 1 1 -3 0zM8.700000000000001 14.8a1.1 1.1 0 1 1 2.2 0a1.1 1.1 0 1 1 -2.2 0zM6.3 12.6a0.7 0.7 0 1 1 1.4 0a0.7 0.7 0 1 1 -1.4 0z" fill="currentColor" stroke="none" fill-rule="evenodd"/>'
        );
    });

    it('pins the moonStars non-retracing crescent plus the two unchanged twinkles in one path', () => {
        // moon-stars.ts: SAME upright non-retracing crescent as moonCloud
        // ('M10 2A6 6 0 1 0 10 14Q3 8 10 2z' — see the moonCloud test for
        // the derivation), then the unchanged twinkles sparkle(17.2,15.4,
        // 2.6,0.55) and sparkle(13.6,19.6,1.8,0.45) (moon-stars.ts sparkle
        // builder; the fractional shoulder offsets carry verbatim JS float
        // noise, e.g. 15.4+0.55 → 15.950000000000001).
        expect(ICON_MOON_STARS).toBe(
            '<path d="M10 2A6 6 0 1 0 10 14Q3 8 10 2zM17.2 12.8L17.75 14.85L19.8 15.4L17.75 15.950000000000001L17.2 18L16.65 15.950000000000001L14.6 15.4L16.65 14.85zM13.6 17.8L14.049999999999999 19.150000000000002L15.4 19.6L14.049999999999999 20.05L13.6 21.400000000000002L13.15 20.05L11.799999999999999 19.6L13.15 19.150000000000002z" fill="currentColor" stroke="none"/>'
        );
    });

    it('cuts the fullMoon craters as holes in the SAME evenodd path as the disk — whole-d equality, zero opaque circles', () => {
        // REQUIREMENT: the disk silhouette and the four crater holes ride
        // ONE fill-rule="evenodd" path (evenodd depth 2 carves each crater);
        // ZERO <circle> elements — an opaque disk element painted alongside
        // would fill every intended hole. The WHOLE d is reconstructed from
        // the documented full-moon.ts:17 circlePath template at the module's
        // documented centers/radii (disk (12,12) r 8.2; craters (9.2,10)
        // r 1.9, (14.6,14.8) r 1.5, (15.4,8.2) r 1.0, (8.4,15.8) r 0.9) —
        // verbatim JS double arithmetic (12−8.2 → 3.8000000000000007,
        // 9.2−1.9 → 7.299999999999999), derived not captured.
        const circlePath = (cx: number, cy: number, r: number): string =>
            `M${cx - r} ${cy}a${r} ${r} 0 1 1 ${2 * r} 0a${r} ${r} 0 1 1 ${-2 * r} 0z`;
        const expectedD =
            circlePath(12, 12, 8.2) +
            circlePath(9.2, 10, 1.9) +
            circlePath(14.6, 14.8, 1.5) +
            circlePath(15.4, 8.2, 1.0) +
            circlePath(8.4, 15.8, 0.9);
        // Whole-definition pin: the ICON constant is EXACTLY the one-path
        // evenodd element around the reconstructed d.
        expect(ICON_FULL_MOON).toBe(
            `<path d="${expectedD}" fill="currentColor" stroke="none" fill-rule="evenodd"/>`
        );
        // Parsed render: one path, zero circles, evenodd, whole-d equality.
        const doc = new DOMParser().parseFromString(svgFullMoon(), 'image/svg+xml');
        expect(doc.getElementsByTagName('path').length, 'fullMoon path census').toBe(1);
        expect(doc.getElementsByTagName('circle').length, 'fullMoon opaque-circle census').toBe(0);
        const path = doc.getElementsByTagName('path')[0];
        expect(path.getAttribute('fill-rule')).toBe('evenodd');
        expect(path.getAttribute('d')).toBe(expectedD);
    });

    it('cuts the eclipse corona as ONE evenodd annulus plus 8 trig-computed spikes — whole spike-d equality, no occluding disk', () => {
        // REQUIREMENT: the ring is a TRUE annulus hole (outer r 9 sweep-1 +
        // REVERSED inner r 7.4 sweep-0 in ONE evenodd path) so the interior
        // stays transparent; ZERO <circle> elements — an opaque occluding
        // disk painted after the ring would fill the annulus hole. The
        // WHOLE spike d is reconstructed from the documented eclipse.ts:18
        // trig contract (tips r 10.9, bases r 6.8, ±14° spread, 45° steps,
        // toFixed(2) formatting) — independent geometric derivation.
        const spikeTriangle = (deg: number, tip: number, base: number, spread: number): string => {
            const a = ((deg - spread) * Math.PI) / 180, b = ((deg + spread) * Math.PI) / 180;
            const t = (deg * Math.PI) / 180;
            return (
                `M${(12 + tip * Math.cos(t)).toFixed(2)} ${(12 + tip * Math.sin(t)).toFixed(2)}` +
                `L${(12 + base * Math.cos(a)).toFixed(2)} ${(12 + base * Math.sin(a)).toFixed(2)}` +
                `L${(12 + base * Math.cos(b)).toFixed(2)} ${(12 + base * Math.sin(b)).toFixed(2)}z`
            );
        };
        const expectedSpikeD = [0, 45, 90, 135, 180, 225, 270, 315]
            .map((deg) => spikeTriangle(deg, 10.9, 6.8, 14))
            .join('');
        // Exact ring annulus d (integer literals, hand-derivable from the
        // template: circlePath(12,12,9) = M3 12…; inner reversed r 7.4 =
        // M4.6 12… sweep-0) + explicit evenodd on the ring path.
        const expectedRingD =
            'M3 12a9 9 0 1 1 18 0a9 9 0 1 1 -18 0zM4.6 12a7.4 7.4 0 1 0 14.8 0a7.4 7.4 0 1 0 -14.8 0z';
        expect(ICON_ECLIPSE).toBe(
            `<path d="${expectedRingD}" fill="currentColor" stroke="none" fill-rule="evenodd"/>` +
                `<path d="${expectedSpikeD}" fill="currentColor" stroke="none"/>`
        );
        // Parsed render: two paths, zero circles.
        const doc = new DOMParser().parseFromString(svgEclipse(), 'image/svg+xml');
        expect(doc.getElementsByTagName('path').length, 'eclipse path census').toBe(2);
        expect(doc.getElementsByTagName('circle').length, 'eclipse occluding-circle census').toBe(0);
        const ring = doc.getElementsByTagName('path')[0];
        const spikes = doc.getElementsByTagName('path')[1];
        expect(ring.getAttribute('d')).toBe(expectedRingD);
        expect(ring.getAttribute('fill-rule')).toBe('evenodd');
        // Spike path: solid (no fill-rule) with the exact eight triangles.
        expect(spikes.getAttribute('fill-rule')).toBeNull();
        expect(spikes.getAttribute('d')).toBe(expectedSpikeD);
        // Spot identity: the east spike is M(22.90,12.00) with both base
        // corners at x 18.60 (6.8·cos14° = 6.598011 → 18.60) and y
        // 10.35/13.65 (6.8·sin14° = 1.645069 → ±1.65 offsets).
        expect(expectedSpikeD).toContain('M22.90 12.00L18.60 10.35L18.60 13.65z');
    });
});
