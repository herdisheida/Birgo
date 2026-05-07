import { Heart, Clock, Sparkles, Users, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-8 shadow-sm border border-blue-200">
            <Heart className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Við gerum hversdaginn einfaldari
          </h1>
          <p className="text-xl text-slate-500">
            Við trúum því að það að verða uppiskroppa með nauðsynjar ætti að
            heyra sögunni til.
          </p>
        </div>
      </section>

      {/* Vandamál og Lausn */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-10 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mb-6">
              <Clock className="w-7 h-7 text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Vandamálið
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Lífið er annasamt. Við gleymum að kaupa klósettpappír,
              uppþvottalögurinn klárast á versta tíma og hreinlætisvörurnar
              gleymast í búðinni. Þetta er pirrandi og sóar dýrmætum tíma.
            </p>
          </div>

          <div className="p-10 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Okkar lausn
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Birgó lærir inn á þína notkun og sendir heimilisnauðsynjar
              sjálfkrafa heim til þín, rétt áður en þær klárast. Engar
              neyðarferðir út í búð, ekkert andlegt álag. Bara einum hlut færra
              til að hafa áhyggjur af.
            </p>
          </div>
        </div>
      </section>

      {/* Markmið */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-12 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-center text-white shadow-xl relative overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Okkar markmið
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed font-medium">
              Við erum hér til að gera hversdaginn einfaldari. Með því að sjá um
              smávægilegu, endurteknu verkin sem draga úr orku þinni, gefum við
              þér meiri tíma fyrir það sem raunverulega skiptir máli.
            </p>
          </div>
        </div>
      </section>

      {/* Hverjum hjálpum við */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-slate-900 mb-12">
            Hverjum hjálpum við?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2rem] bg-white border border-slate-100 text-center shadow-sm hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 mx-auto mb-6 flex items-center justify-center">
                <Clock className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Önnuðu fólki
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Vinnurðu mikið? Við sjáum um grunnþarfirnar svo þú getir
                einbeitt þér að þínum verkefnum og átt meiri frítíma.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-white border border-slate-100 text-center shadow-sm hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 mx-auto mb-6 flex items-center justify-center">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Fjölskyldum
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Að púsla saman börnum, vinnu og heimili? Við tryggjum að þið
                verðið aldrei uppiskroppa þegar á þarf að halda.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-white border border-slate-100 text-center shadow-sm hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 mx-auto mb-6 flex items-center justify-center">
                <Home className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Ungu fólki
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Nýflutt/ur að heiman? Við hjálpum þér að byggja upp góðar venjur
                og halda heimilinu birgðu af nauðsynjum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
          Tilbúin/n að einfalda lífið?
        </h2>
        <p className="text-lg text-slate-500 mb-10 max-w-lg mx-auto">
          Slástu í hóp þúsunda sem þurfa ekki lengur að hafa áhyggjur af því að
          eiga til klósettpappír.
        </p>
        <Link
          href="/auth"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-blue-600 text-white font-bold text-lg transition-all hover:bg-blue-700 hover:scale-105 shadow-lg"
        >
          Byrja núna <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
