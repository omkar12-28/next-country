const Footer = () => {
  return (
  <footer className="border-t border-border bg-card py-6">
    <div className="container mx-auto px-4">
      <p className="text-sm text-muted-foreground text-center">
        © {new Date().getFullYear()} NextCountry. All rights reserved.
      </p>
    </div>
  </footer>
  )
}

export default Footer