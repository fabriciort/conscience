module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/data/audiences.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "audienceSegments",
    ()=>audienceSegments
]);
const audienceSegments = [
    {
        id: "researcher",
        title: "Pesquisadores",
        description: "Transforme descobertas acadêmicas em impacto social com programas de pesquisa aplicada e financiamento colaborativo.",
        benefits: [
            "Match automatizado com laboratórios e hubs de inovação",
            "Banco de dados dinâmico de editais e fomento",
            "Mentoria individual com cientistas seniores"
        ],
        video: {
            title: "Pesquisa aplicada na Amazônia",
            duration: "6 min"
        },
        sampleMentors: [
            {
                name: "Dra. Helena Ramos",
                role: "Cientista de Dados Climáticos"
            },
            {
                name: "Prof. Mateus Ibarra",
                role: "Coordenador de P&D"
            }
        ],
        whatsappMessage: "Olá! Quero conhecer os programas para pesquisadores da Conscience."
    },
    {
        id: "professional",
        title: "Profissionais",
        description: "Atualize habilidades emergentes com projetos guiados, diagnósticos de competência e mentores de mercado.",
        benefits: [
            "Trilhas adaptadas ao seu objetivo de carreira",
            "Feedback contínuo e relatórios de evolução",
            "Comunidade multissetorial com networking ativo"
        ],
        video: {
            title: "Storytelling com dados para líderes",
            duration: "4 min"
        },
        sampleMentors: [
            {
                name: "Igor Nogueira",
                role: "Head de Inovação"
            },
            {
                name: "Camila Duarte",
                role: "Tech Lead em IA"
            }
        ],
        whatsappMessage: "Olá! Quero saber como a Conscience apoia profissionais em transição."
    },
    {
        id: "student",
        title: "Estudantes",
        description: "Comece projetos impactantes com desafios reais, maratonas criativas e comunidade acolhedora.",
        benefits: [
            "Planos de estudo personalizados por área",
            "Mentorias coletivas semanais",
            "Bolsa Conscience para protagonismo jovem"
        ],
        video: {
            title: "Construindo um projeto social desde o zero",
            duration: "5 min"
        },
        sampleMentors: [
            {
                name: "Rebeca Sato",
                role: "Mentora de Projetos Sociais"
            },
            {
                name: "Leo Braga",
                role: "Facilitador STEAM"
            }
        ],
        whatsappMessage: "Oi! Quero entender como a Conscience ajuda estudantes a construir projetos."
    },
    {
        id: "company",
        title: "Empresas",
        description: "Desenvolva culturas de aprendizagem contínua e programas de inovação com curadoria estratégica.",
        benefits: [
            "Academias internas personalizadas",
            "Análises de impacto e competências",
            "Mentores exclusivos com NDA"
        ],
        video: {
            title: "Lab Conscience para squads corporativos",
            duration: "7 min"
        },
        sampleMentors: [
            {
                name: "Amanda Costa",
                role: "Consultora de Cultura de Inovação"
            },
            {
                name: "Rafael Lopes",
                role: "Especialista em Aprendizagem Corporativa"
            }
        ],
        whatsappMessage: "Olá! Quero conversar sobre programas corporativos da Conscience."
    }
];
}),
"[project]/lib/data/testimonials.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "testimonials",
    ()=>testimonials
]);
const testimonials = [
    {
        id: "researcher-1",
        quote: "Com a Conscience consegui estruturar um laboratório vivo que conectou universidades e comunidades ribeirinhas. O suporte metodológico foi essencial.",
        name: "Dr. Vinícius Prado",
        role: "Pesquisador em Sustentabilidade",
        segment: "Pesquisador"
    },
    {
        id: "professional-1",
        quote: "Os sprints de aprendizagem me ajudaram a criar uma área de inovação inclusiva. As mentorias são práticas e voltadas a resultados reais.",
        name: "Júlia Fernandes",
        role: "Head de Transformação Digital",
        segment: "Profissional"
    },
    {
        id: "student-1",
        quote: "Ganhei confiança para liderar meu primeiro projeto social e consegui bolsa de estudos graças à rede de mentores.",
        name: "Marcos Silva",
        role: "Estudante de Engenharia",
        segment: "Estudante"
    },
    {
        id: "company-1",
        quote: "Os laboratórios corporate labs da Conscience aceleraram nossa equipe cross-funcional com frameworks atualizados e acompanhamento dedicado.",
        name: "Renata Lima",
        role: "Diretora de Pessoas & Cultura",
        segment: "Empresa"
    }
];
}),
"[project]/lib/utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatCurrencyBRL",
    ()=>formatCurrencyBRL,
    "getWhatsAppLink",
    ()=>getWhatsAppLink
]);
function getWhatsAppLink(message) {
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5581999999999";
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${number}?text=${encoded}`;
}
function formatCurrencyBRL(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0
    }).format(value);
}
}),
"[project]/components/segment-switcher.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "SegmentSwitcher",
    ()=>SegmentSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$2_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.2_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SegmentSwitcher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$2_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SegmentSwitcher() from the server but SegmentSwitcher is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/segment-switcher.tsx <module evaluation>", "SegmentSwitcher");
}),
"[project]/components/segment-switcher.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "SegmentSwitcher",
    ()=>SegmentSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$2_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.2_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SegmentSwitcher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$2_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SegmentSwitcher() from the server but SegmentSwitcher is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/segment-switcher.tsx", "SegmentSwitcher");
}),
"[project]/components/segment-switcher.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$segment$2d$switcher$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/segment-switcher.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$segment$2d$switcher$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/segment-switcher.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$segment$2d$switcher$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/testimonials-carousel.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "TestimonialsCarousel",
    ()=>TestimonialsCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$2_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.2_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const TestimonialsCarousel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$2_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call TestimonialsCarousel() from the server but TestimonialsCarousel is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/testimonials-carousel.tsx <module evaluation>", "TestimonialsCarousel");
}),
"[project]/components/testimonials-carousel.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "TestimonialsCarousel",
    ()=>TestimonialsCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$2_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.2_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const TestimonialsCarousel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$2_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call TestimonialsCarousel() from the server but TestimonialsCarousel is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/testimonials-carousel.tsx", "TestimonialsCarousel");
}),
"[project]/components/testimonials-carousel.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$testimonials$2d$carousel$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/testimonials-carousel.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$testimonials$2d$carousel$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/testimonials-carousel.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$testimonials$2d$carousel$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/app/page.tsx'\n\nUnexpected token. Did you mean `{'}'}` or `&rbrace;`?");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a368de5b._.js.map