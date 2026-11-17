import { Button } from '@/components/Button'
import { getSiteText } from '@/lib/payload'

export default async function NotFound() {
  const t = await getSiteText()
  return (
    <section className="wrap flex min-h-[60vh] flex-col justify-center py-24">
      <h1 className="text-4xl font-semibold text-ink md:text-5xl">{t.notFound.heading}</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{t.notFound.text}</p>
      <div className="mt-8">
        <Button href="/">{t.notFound.button}</Button>
      </div>
    </section>
  )
}
