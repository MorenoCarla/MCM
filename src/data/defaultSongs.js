import { ADORACION_SONGS } from './adoracionSongs';

/** Repertorio base del coro MCM — incluido al publicar en GitHub */
const MISA_SONGS = [
  {
    id: 'dejame-nacer-de-nuevo',
    title: 'Dejame nacer de nuevo',
    key: 'C',
    artist: '',
    placements: [{ categoryId: 'misa', momentId: 'kyrie' }],
    body: ` C               F            C   C7
Tú conoces la dureza en mi sentir
      F             G             C  C7
Y la terquedad que hay en mi corazón
         F             G          C
Son las cosas que me alejaron de ti
 Em Am
Se-ñor
 F         G          C  C7
Hazme renacer en tu amor

          F       G
Dejame nacer de nuevo
          C  Em  Am
Dejame nacer de nuevo
           F       G          C  C7
¡Dejame nacer de nuevo, oh Señor!
                F       G
No importa la edad que tenga
             C  Em   Am
Tú no la tienes en cuenta
           F       G       C
¡Dejame nacer de nuevo, Señor!

 C               F               C  C7
Tú conoces el pecado que hay en mí
        F              G            C  C7
Y el dolor que éste dejó en mi corazón
         F               G              C
Por la muerte que he causado, vuelvo a ti
 Em Am
Se-ñor
 F          G            C  C7
Dame Vida nueva con tu amor

          F       G
Dejame nacer de nuevo
          C  Em  Am
Dejame nacer de nuevo
           F       G          C  C7
¡Dejame nacer de nuevo, oh Señor!
                F       G
No importa la edad que tenga
             C  Em   Am
Tú no la tienes en cuenta
           F       G       C
¡Dejame nacer de nuevo, Señor!`,
  },
  {
    id: 'gloria-a-dios-gloria-al-padre',
    title: 'Gloria a Dios, Gloria al Padre',
    key: 'Dm',
    artist: '',
    placements: [{ categoryId: 'misa', momentId: 'gloria' }],
    body: `Solista: Gloria a Dios
                A7       Dm
Gloria a Dios, gloria al Padre

Todos: Gloria a Dios
Gloria a Dios, gloria al padre

          Gm    A7      Dm
Solista: A él le sea la gloria
Todos: A el le sea la gloria

          A7     Dm
Solista: Aleluya, amén
Todos: Aleluya, amén

            C      Dm
Solista: Aleluya, amén
Todos: Aleluya, amén`,
  },
  {
    id: 'esto-que-soy-eso-te-doy',
    title: 'Esto que soy, eso te doy',
    key: 'A',
    artist: '',
    placements: [{ categoryId: 'misa', momentId: 'ofertorio' }],
    body: `  A
A veces me pregunto ¿por que yo?
 F#m
Y solo me respondes porque quiero
  D                 Bm
Es un misterio grande que nos llames
 A
Asi tal como sos a tu encuentro
 A
Entonces redescubro una verdad
  F#m
Mi vida, nuestra vida es un tesoro
   D
Se trata entonces solo de ofrecerte
  A
Con todo nuestro amor, esto que somos

      E       F#m
¿Que te dare? ¿que te daremos?
       D       A
¡Si todo,todo es tu regalo
      E        F#m
Te ofrecere, te ofreceremos
        C#m
Esto que somos
         D    E     A
Esto que soy, ¡eso te doy!

 A
Esto que soy, esto es lo que te doy
F#m
Esto que somos es lo que te damos
D                            Bm
Tu no desprecias nuestra vida humilde
A
Se trata de poner todo en tus manos
A
Aquí van mis trabajos y mi fe
F#m
Mis mates, mis bajones y mis sueños
D                          Bm
Y todas las personas que me diste
A
Desde mi corazón te las ofrezco

E       F#m
¿Que te dare? ¿que te daremos?
       D       A
¡Si todo,todo es tu regalo
      E        F#m
Te ofrecere, te ofreceremos
        C#m
Esto que somos
         D    E     A
Esto que soy, ¡eso te doy!

A
Vi tanta gente un domingo de sol
F#m
Me conmovió el latir de tantas vidas
D                         Bm
Y adivine tu abrazo gigantesco
A
Y se que sus historias recibías
A
Por eso tu altar luce vino y pan
F#m
Son signo y homenaje de la vida
D                        Bm
Misterio de ofrecerte y recibirnos
A
Humanidad que cristo diviniza

E       F#m
¿Que te dare? ¿que te daremos?
       D       A
¡Si todo,todo es tu regalo
      E        F#m
Te ofrecere, te ofreceremos
        C#m
Esto que somos
         D    E     A
Esto que soy, ¡eso te doy!`,
  },
  {
    id: 'santo',
    title: 'Santo',
    key: 'G',
    artist: '',
    placements: [{ categoryId: 'misa', momentId: 'santo' }],
    body: `Em             D            C          B7
Santo es el señor mi Dios, digno de alabanza
Em         D         C           B7
A El el poder, el honor y la gloria.(Bis)

Em         D       C        B7
Hosana, Hosana, Hosana oh Señor (Bis)

Em               D          C          B7
Bendito el que viene, en nombre del Señor.
    Em         D       C           B7
Con todos sus santos cantamos para Él.(Bis)`,
  },
  {
    id: 'cordero-de-dios',
    title: 'Cordero de Dios',
    key: 'D',
    artist: '',
    placements: [{ categoryId: 'misa', momentId: 'cordero' }],
    body: `Bm                     E    G     A       Bm
Cordero de Dios, Que quitas el pecado del mundo
        E      Bm            F#7      Bm
Ten piedad de nosotros, Ten piedad de nosotros
Bm                     E    G     A       Bm
Cordero de Dios, Que quitas el pecado del mundo
        E      Bm            F#7      Bm
Ten piedad de nosotros, Ten piedad de nosotros
Bm                     E    G     A       Bm
Cordero de Dios, Que quitas el pecado del mundo
  E    Bm     F#7    Bm
Danos la Paz, Danos la paz, Danosla`,
  },
  {
    id: 'pescador-de-hombres',
    title: 'Pescador de Hombres',
    key: 'A',
    artist: '',
    placements: [{ categoryId: 'misa', momentId: 'comunion' }],
    body: `A  E                  F#m
Tú has venido a la orilla
           D                   E
No has buscado ni a sabios ni a ricos
            A        E     A     A7
Tan sólo quieres que yo te siga

   D  E                     A   F#m
Señor, me has mirado a los ojos
     Bm  E              A      A7
Sonriendo has dicho mi nombre
        D   E              A   F#m
En la arena he dejado mi barca
        Bm E               A
Junto a Ti   buscaré otro mar

A  E                  F#m
Tú sabes bien lo que tengo
      Bm                     E
En mi barca no hay oro ni espada
          A   E          A     A7
Tan sólo redes  y mi trabajo

  D    E                   A  F#m
Señor, me has mirado a los ojos
     Bm  E              A      A7
Sonriendo has dicho mi nombre
        D                 A   F#m
En la arena he dejado mi barca
        Bm E               A
Junto a Ti   buscaré otro mar

A  E                  F#m
Tú necesitas mis manos
      Bm                     E
Mi cansancio que a otros descanse
            A  E          A     A7
Amor que quiera  seguir amando

  D    E                   A  F#m
Señor, me has mirado a los ojos
     Bm  E              A      A7
Sonriendo has dicho mi nombre
        D                 A   F#m
En la arena he dejado mi barca
        Bm E               A
Junto a Ti   buscaré otro mar

A  E                  F#m
Tú, pescador de otros lagos
       Bm                   E
Ansia eterna de almas que esperan
       A   E               A     A7
Amigo bueno  que así me llamas

  D    E                   A  F#m
Señor, me has mirado a los ojos
     Bm  E              A      A7
Sonriendo has dicho mi nombre
        D                 A   F#m
En la arena he dejado mi barca
        Bm E               A
Junto a Ti   buscaré otro mar`,
  },
  {
    id: 'milagro-de-amor',
    title: 'Milagro de amor',
    key: 'G',
    artist: '',
    placements: [{ categoryId: 'misa', momentId: 'comunion' }],
    body: `[Intro] G  D  Em  Em7  C  Am  F  D

G    D                     Em      Em7
Jesus, aqui presente en forma real
   C       Am          F            D
Te pido un poco mas de fe y de humildad
G         D               Em        Em7
Quisiera poder ser digno de compartir
   C         Am        F          D
Contigo el milagro mas grande de amor

[Estribillo]

  G         D           Em
Milagro de amor tan infinito
       Bm                  C
En que Tu, mi Dios, te has hecho
      Am            G             D
Tan pequeño y tan humilde para entrar en mí
  G          D          Em
Milagro de amor tan infinito
       Bm                C
En que Tu, mi Dios, te olvidas
      Am             C           D
De tu gloria y de tu majestad por mí

      G    D            Em   Em7
Y hoy vengo lleno de alegria
      C         Am         F    D
A recibirte en esta eucaristía
       G      D                    Em    Em7
Te doy gracias por llamarme a esta cena
              C              Am          F     D
Porque aunque no soy digno visitas Tu mi alma

[Estribillo]

 G         D           Em
Milagro de amor tan infinito
       Bm                  C
En que Tu, mi Dios, te has hecho
      Am            C            D
Tan pequeño y tan humilde para entrar en mí
  G          D          Em
Milagro de amor tan infinito
       Bm                C
En que Tu, mi Dios, te olvidas
      Am             C            D
De tu gloria y de tu majestad por mí

Am         D        C   D     G
Gracias, señor, por esta comunión`,
  },
  {
    id: 'ya-no-eres-pan-y-vino',
    title: 'Ya no eres Pan y Vino',
    key: 'C',
    artist: '',
    placements: [
      { categoryId: 'misa', momentId: 'comunion' },
      { categoryId: 'adoracion', momentId: '' },
    ],
    body: `[Intro] C  G  Am  F  C

C        F     C
Ya no es pan y vino
                 F        C             G
Ahora que es tu cuerpo y sangre, vives en mí
    F                       C
De rodillas yo caigo al contemplar tu bondad
Am                 G
Como no te voy a adorar

C                   F      C
Mientras te pierdes en mis labios
                 F      C         G
Tu gracia va inundando todo mi corazón
         F                     C
Por esa paz que me llena de alegría mi ser
Am                 G
Como no te voy a adorar

       C            Em
Señor Jesús, mi salvador
        F           C
Amor eterno, amor divino
F             C             G              Am
Ya no falta nada, lo tengo todo, te tengo a ti
F             C             G               C
Ya no falta nada, lo tengo todo, te tengo a ti

C               F     C
Dueño y Rey del universo
            F     C                  G
Como puede ser posible que busques mi amor
          F                       C
Tú tan grande y yo pequeño y te fijas en mi
Am         F       G
Como no te voy a adorar

C           F     C
De rodillas yo te pido
                  F       C             G
Que el día cuando tu me llames sea como hoy
       F                     C
Para mirarte a los ojos y poderte decir
Am         F       G
Como no te voy a adorar

        C           Em
Señor Jesús, mi salvador
       F            C
Amor eterno, amor divino
F            C              G              Am
Ya no falta nada, lo tengo todo, te tengo a ti
F            C              G              Am
Ya no falta nada, lo tengo todo, te tengo a ti
F            C              G              Am
Ya no falta nada, lo tengo todo, te tengo a ti`,
  },
  {
    id: 'tu-estas-aqui-cara-a-cara',
    title: 'Tu estás aquí/Cara a cara',
    key: 'G',
    artist: '',
    placements: [
      { categoryId: 'misa', momentId: 'comunion' },
      { categoryId: 'adoracion', momentId: '' },
    ],
    body: `G
Aunque mis ojos
         C
No te puedan ver
 G
Te puedo sentir
             D
Sé que estás aquí
 G
Aunque mis manos
           C
No puedan tocar
 G
Tu rostro Señor
              D
Séque estás aquí

( C  G )

Mi corazón, puede sentir tu presencia
        Em               D
Tú estás aquí, tú estás aquí
        C             G
Puedo sentir, tu majestad
        Em              D
Tú estás aquí, tú estás aquí

         C
Mi corazón

(Solo déjame mirarte cara a cara)
               G
Puede mirar tu hermosura

(Y perderme como un niño en tu mirada)
C                               D
Tú estás aquí, tú estás aquí
C
Puedo sentir (y que pase mucho tiempo)

         G
Tu gran amor (y que nadie diga nada)
C
Tú estás aquí (sólo déjame mirarte)

      D
Tú estás aquí (cara a cara)

C                D           Bm       Em
Que se ahogue mi recuerdo en tu mirada
C                     D       Bm       Em
Quiero hablarte en el silencio y sin palabras
C               D
Y que pase mucho tiempo
Bm             Em
Y que nadie diga nada
C              G            D
Sólo déjame mirarte cara a cara

C             D    Bm       Em
Sólo déjame mirarte cara a cara
C             D         Bm       Em
Aunque caiga derretida en tu mirada
C                  D
Derrotada y desde el suelo
Bm               Em
Temblorosa y sin aliento
C                G           D
Aún te seguiré mirando mi Maestro

( C  G )

Mi corazón, puede sentir tu hermosura
C                            D
Tú estás aquí, tú estás aquí
C                        G
 Puedo sentir, tu gran amor
C                        D
Tú estás aquí, tú estás aquí`,
  },
  {
    id: 'cristo-reina-remix',
    title: 'Cristo Reina Remix',
    key: 'B',
    artist: '',
    placements: [{ categoryId: 'misa', momentId: 'comunion' }],
    body: `[Intro] B  F#  G#m  E

B                            F#
  Mi corazón quiere alabar, alabarte
G#m                          E
  Mi corazón quiere adorar, adorarte
B                           F#
  Mi corazón quiere alabar, alabarte
G#m                         E
  Mi corazón quiere adorar, adorarte

         B  F#         G#m E
Cristo Reina, Cristo Reina
         B  F#     G#m      E
Cristo Reina   con poder
(Tuyo es el poder, tuyo es el poder)

           B                  F#
Vine a adorarte, vine a postrarme
        G#m              E
Vine a decir que eres mi Dios
              B                      F#
Solo Tú eres grande, solo Tú eres digno
        G#m          E
Eres asombroso para mí
         B        F#
Eres grande, eres digno
        G#m          E
Eres asombroso para mí
         B        F#
Eres grande, eres digno
        G#m          E
Eres asombroso para mí

            B
Y me diste nombre
           F#
Yo soy tu niña
               G#m
La niña de tus ojos
                  E
Porque me amaste a mí

B
Te amo más que a mi vida
F#
Te amo más que a mi vida
G#m                       E
Te amo más que a mi vida, más

(CORO 2x)
           B
Y me diste nombre
(Te amo más que a mi vida)
           F#
Yo soy tu niña
(Te amo más que a mi vida)
               G#m
La niña de tus ojos
(Te amo más que a mi vida, más)
                  E
Porque me amaste a mí

(CORO 2x)
         C#  G#         A#m F#
Cristo Reina, Cristo Reina
         C#  G#     A#m      F#
Cristo Reina  con poder
(Tuyo es el poder, tuyo es el poder)`,
  },
  {
    id: 'maria-mirame',
    title: 'Maria Mirame',
    key: 'C',
    artist: '',
    placements: [
      { categoryId: 'misa', momentId: 'salida' },
      { categoryId: 'maria', momentId: '' },
    ],
    body: `C             C          Am
María mírame, María mírame
F            C  F                  G
Si tú me miras, Él también me mirará
             Am    F         C     F
Madre mía mírame, de la mano llévame
              C       G                C
Muy cerca de Él, que ahí me quiero quedar

        Am     G       Am
María cúbreme con tu manto
           F      G    C  C7
Que tengo miedo, no sé rezar
F            G               C
Que por tus ojos misericordiosos
Am        F          G        C
Tendré la fuerza, tendré la paz

C             C          Am
María mírame, María mírame
F            C  F                  G
Si tú me miras, Él también me mirará
             Am    F         C     F
Madre mía mírame, de la mano llévame
              C       G                C
Muy cerca de Él, que ahí me quiero quedar

           Am        G   Am
Madre consuélame de mis penas
            F         G    C  C7
Es que no quiero, ofenderle más
F               G              C
Que por tus ojos misericordiosos
Am             F         G     C
Quiero ir al cielo, y verlos ya

C             C          Am
María mírame, María mírame
F            C  F                  G
Si tú me miras, Él también me mirará
             Am    F         C     F
Madre mía mírame, de la mano llévame
              C       G                C
Muy cerca de Él, que ahí me quiero quedar`,
  },
  {
    id: 'junto-a-ti-maria',
    title: 'Junto a ti María',
    key: 'D',
    artist: '',
    placements: [
      { categoryId: 'misa', momentId: 'salida' },
      { categoryId: 'maria', momentId: '' },
    ],
    body: `[Intro] D  A

D             A
Junto a ti María
     Bm             F#m
Como un niño quiero estar
G              D
Tómame en tus manos
    E             A
Guíame en mi caminar

D               A
Quiero que me eduques
         Bm       F#m
Que me enseñes a rezar
G             D
Hazme transparente
     A      D   A7
Lléname de paz

D  A   Bm  F#m
Madre , Madre
G  D   E   A   A7
Madre , Madre

D  A   Bm  F#m
Madre , Madre
G  D   E  A  D   A7
Madre  ,  Madre

D              A
Gracias Madre mía
Bm               F#m
Por llevarnos a Jesús
G                D
Haznos más humildes
       E           A
Tan sencillos como tú

D              A
Gracias Madre mía
Bm              F#m
Por abrir tu corazón
G                 D
Porque nos congregas
       A       D   A7
Y nos das tu amor

D  A   Bm F#m
Madre , Madre
G  D   E   A   A7
Madre , Madre

D  A   Bm F#m
Madre , Madre
G  D   E  A  D
Madre  ,  Madre`,
  },
  {
    id: 'madre-de-consolacion',
    title: 'Madre de Consolación',
    key: 'D',
    artist: '',
    placements: [
      { categoryId: 'misa', momentId: 'salida' },
      { categoryId: 'maria', momentId: '' },
    ],
    body: `  D   G           D       G
Surca una voz al silencio,
              F#m           Em
agua en el desierto del dolor,
     A
sin voz.

 D   G                D     G
Abre un corazón la marcha,
                 F#m
un suspiro que embrisa
         Em    A
y quiere dar Amor,
  G        A        D
pues escuchaba el clamor,
 G             A       D
Dios se hace consolación.

D    G                D     G
Niña, con dulces sueños,
                 F#m
de darle a este mundo
         Em    A
la esperada salvación.

  D    G                D     G
Fuerza, que invade la vida,
                 F#m
que forja esperanzas
             Em    A
desde un virginal Amor.

  D  A               Bm    F#m
Niña, aceptaste ser madre,
                G
existe una esclava,
                F#m
apartaste tus miedos,
                F#m
afrontaste un futuro,
            A
lleno de dolor.

  D    A                    Bm    F#m
Gracias por tu SÍ a la esperanza,
                   G
que nos abra un camino,

                F#m
hacia el Dios infinito,
                  Em
hacia un Padre que ama
                       A
y que espera hasta el fin.
         G          A     D
Ya eres Madre de la creación,
G          A      D
Madre de consolación.

  D    G                D     G
Buscas, una historia naciente,
                 F#m
una antorcha que brille
         Em         A
y consuele con su luz.

 D  G                D     G
Como el Dios Omnipotente,
                 F#m
que redime y consuela
         Em         A
a su pueblo en la Cruz.

  G            A        D
Nace otra historia de Amor,
G             A       D
Dios se hace consolación.

  D   G                D     G
Fuego, que consume mi alma,
                 F#m
es la voz de Tu Hijo
         Em         A
que me llama a seguir.

  D    G                D     G
Siguen atrayendo caminos,
                 F#m
y parece que el mío
         Em         A
va guiándolo hasta aquí.

  D  A               Bm    F#m
Madre, es tuyo el momento,
                G
contigo en la lucha,
              F#m
de encauzar caminos,
             Em
forjar los destinos,
        A
para liberar.

  D  A
Madre, Tu tiempo

        Bm    F#m
es mi tiempo,
           G
cerrar esperanzas,
             F#m
abrir horizontes,
              Em
mostrar a los hombres,
              A
el rostro de Dios.

  D   A               Bm    F#m
Madre, haz mío el silencio,
                 G
que oiga en el tiempo,
              F#m
la voz que me llama,
             Em
de Aquél que me ama,
                 A
y me impulsa a seguir.

G         A      D
Madre de consolación,
G        A         D
Madre de consolación.`,
  },
  {
    id: 'consolad',
    title: 'Consolad',
    key: 'C',
    artist: '',
    placements: [{ categoryId: 'misa', momentId: 'entrada' }],
    body: `  C                       G
 Consolad a mi pueblo dice el Señor
      Dm                 G
  hablad al corazón del hombre.
      Dm                   Am
  Gritad que mi amor ha vencido
                 Dm F                  G7
  preparad el camino que viene tu Redentor.

 C           G
YO TE HE ELEGIDO PARA AMAR
            Dm      Am
TE DOY MI FUERZA Y LUZ PARA GUIAR
 C         G
YO SOY CONSUELO EN TU MIRAR
  Dm         G
GLORIA A DIOS

  Consolad a mi pueblo dice el Señor
  sacad de la ceguera a mi pueblo.
  Yo he sellado contigo
  alianza perpetua yo soy el único Dios.

  Consolad a mi pueblo dice el Señor
  mostradles el camino de libertad.
  Yo os daré fuertes alas
  transformaré tus pisadas en sendas de eternidad.`,
  },
  {
    id: 'una-vez-mas-rezare',
    title: 'Una vez más rezaré',
    key: 'C',
    artist: '',
    placements: [{ categoryId: 'misa', momentId: 'kyrie' }],
    body: `[Intro] C  Em  F  Dm  G

     C
Una vez más rezaré
      Em
De rodillas me pondré
       F              Dm
Y yo sé que una vez más
          C   G
Él me perdona

Le diré que soy humano
Que pequé que luché en vano
Y yo se que una vez más
Él me perdona

          C            G           Am
Para un Dios que conoció la tentación
      Em           F
Del amigo la traición
      F7          Dm         G
Yo no dudo me perdone Dios amigo
          C            G           Am
Para un Dios que conoció la tentación
      Em           F
Del amigo la traición
       F7        Dm          G
Yo no dudo me perdone Dios amigo
          C
Dios amor`,
  },
  {
    id: 'aleluya-gloria-aleluya',
    title: 'Aleluya Gloria Aleluya',
    key: 'C',
    artist: '',
    placements: [{ categoryId: 'misa', momentId: 'aleluya' }],
    body: `C
¡Aleluya, gloria, aleluya!
Am
¡Aleluya, gloria, aleluya!
F
¡Aleluya, gloria, aleluya!
G
¡Aleluya, gloria, aleluya!

Canten alegres, canten a Dios
habitantes de toda la tierra.
Sirvan a Dios con alegrí¬a,
lleguen a El con regocijo.`,
  },
];

export const DEFAULT_SONGS = [...MISA_SONGS, ...ADORACION_SONGS];
