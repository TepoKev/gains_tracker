import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gains Tracker",
  description: "Gains Tracker",
};

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/TepoKev">
        Gains Tracker
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            {children}
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
      </body>
    </html>
  );
}
