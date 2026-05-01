import { Heart, Clock, Sparkles, Users, Home } from "lucide-react";
import { Link } from "react-router";
import { Layout } from "../components/Layout";

export function About() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: "#90C4F4" }}
          >
            <Heart className="w-10 h-10" style={{ color: "#1D3C6E" }} />
          </div>
          <h1
            className="mb-4"
            style={{
              fontSize: "2.5rem",
              color: "#1D3C6E",
              fontWeight: "600",
              lineHeight: "1.2",
            }}
          >
            Making everyday life easier
          </h1>
          <p className="text-lg" style={{ color: "#1D3C6E", opacity: "0.7" }}>
            We believe running out of essentials should be a thing of the past
          </p>
        </div>

        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="p-8 rounded-3xl bg-white">
            <div
              className="w-14 h-14 rounded-full mb-4 flex items-center justify-center"
              style={{ backgroundColor: "#E8EBEF" }}
            >
              <Clock className="w-7 h-7" style={{ color: "#1D3C6E" }} />
            </div>
            <h2
              className="mb-3"
              style={{
                fontSize: "1.5rem",
                color: "#1D3C6E",
                fontWeight: "600",
              }}
            >
              The problem
            </h2>
            <p style={{ color: "#1D3C6E", opacity: "0.7", lineHeight: "1.6" }}>
              Life gets busy. We forget to buy toilet paper, run out of soap at
              the worst time, or realize we're out of detergent when the laundry
              piles up. It's frustrating and wastes precious time.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white">
            <div
              className="w-14 h-14 rounded-full mb-4 flex items-center justify-center"
              style={{ backgroundColor: "#90C4F4" }}
            >
              <Sparkles className="w-7 h-7" style={{ color: "#1D3C6E" }} />
            </div>
            <h2
              className="mb-3"
              style={{
                fontSize: "1.5rem",
                color: "#1D3C6E",
                fontWeight: "600",
              }}
            >
              Our solution
            </h2>
            <p style={{ color: "#1D3C6E", opacity: "0.7", lineHeight: "1.6" }}>
              Birgó learns your usage patterns and delivers household essentials
              automatically, right before you run out. No more emergency store
              runs. No more mental load. Just one less thing to worry about.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="p-10 rounded-3xl bg-white text-center mb-16">
          <h2
            className="mb-4"
            style={{ fontSize: "2rem", color: "#1D3C6E", fontWeight: "600" }}
          >
            Our mission
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#1D3C6E", opacity: "0.7", lineHeight: "1.6" }}
          >
            We exist to make everyday life easier. By taking care of the small,
            repetitive tasks that drain your energy, we give you more time for
            what actually matters.
          </p>
        </div>

        {/* Who it's for */}
        <div className="mb-16">
          <h2
            className="text-center mb-10"
            style={{ fontSize: "2rem", color: "#1D3C6E", fontWeight: "600" }}
          >
            Who we help
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white text-center hover:shadow-lg transition-shadow">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "#90C4F4" }}
              >
                <Clock className="w-8 h-8" style={{ color: "#1D3C6E" }} />
              </div>
              <h3
                className="mb-3"
                style={{
                  fontSize: "1.25rem",
                  color: "#1D3C6E",
                  fontWeight: "600",
                }}
              >
                Busy professionals
              </h3>
              <p
                className="text-sm"
                style={{ color: "#1D3C6E", opacity: "0.7", lineHeight: "1.6" }}
              >
                Working long hours? We handle the basics so you can focus on
                your career and still have time for yourself.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white text-center hover:shadow-lg transition-shadow">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "#90C4F4" }}
              >
                <Users className="w-8 h-8" style={{ color: "#1D3C6E" }} />
              </div>
              <h3
                className="mb-3"
                style={{
                  fontSize: "1.25rem",
                  color: "#1D3C6E",
                  fontWeight: "600",
                }}
              >
                Families
              </h3>
              <p
                className="text-sm"
                style={{ color: "#1D3C6E", opacity: "0.7", lineHeight: "1.6" }}
              >
                Juggling kids, work, and home? We make sure you never run out of
                essentials when you need them most.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white text-center hover:shadow-lg transition-shadow">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "#90C4F4" }}
              >
                <Home className="w-8 h-8" style={{ color: "#1D3C6E" }} />
              </div>
              <h3
                className="mb-3"
                style={{
                  fontSize: "1.25rem",
                  color: "#1D3C6E",
                  fontWeight: "600",
                }}
              >
                Young individuals
              </h3>
              <p
                className="text-sm"
                style={{ color: "#1D3C6E", opacity: "0.7", lineHeight: "1.6" }}
              >
                Just starting out on your own? We help you build good habits and
                stay stocked without the stress.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="p-10 rounded-3xl text-center"
          style={{ backgroundColor: "#6FAEF2" }}
        >
          <h2
            className="mb-4 text-white"
            style={{ fontSize: "2rem", fontWeight: "600" }}
          >
            Ready to simplify your life?
          </h2>
          <p className="mb-6 text-white opacity-90">
            Join thousands who never worry about running out of essentials
          </p>
          <Link
            to="/get-started"
            className="inline-block px-8 py-3 rounded-full transition-transform hover:scale-105"
            style={{
              backgroundColor: "white",
              color: "#1D3C6E",
              fontWeight: "600",
            }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </Layout>
  );
}
