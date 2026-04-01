"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const team = [
  { name: "Md. Rafiul Islam", position: "President", initials: "RI" },
  { name: "Fatima Akter", position: "Vice President", initials: "FA" },
  { name: "Tanvir Ahmed", position: "General Secretary", initials: "TA" },
  { name: "Nusrat Jahan", position: "Treasurer", initials: "NJ" },
];

export function TeamSection() {
  return (
    <section id="team" className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Executive Panel{" "}
            <span className="text-primary">2025-2026</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Meet the leaders driving BUP EIC forward this year.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col items-center pt-2">
                  <Avatar
                    size="lg"
                    className="size-20 text-lg"
                  >
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-primary font-medium">
                    {member.position}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
