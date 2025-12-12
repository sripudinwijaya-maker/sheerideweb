export default function Home() {
  return (
    <main style={{
      fontFamily:'sans-serif',
      padding:40,
      maxWidth:500,
      margin:'0 auto'
    }}>
      <h1>Verifikasi Gemini Pro</h1>
      <p>Tempel link verifikasi SheerID & upload dokumen mahasiswa.</p>

      <form method="POST" action="/api/verify" encType="multipart/form-data">
        <label>Link Verifikasi:</label>
        <input
          name="link"
          placeholder="https://my.sheerid.com/...verificationId=xxx"
          style={{width:'100%', padding:10, marginTop:6, border:'1px solid #ccc', borderRadius:6}}
        />

        <label style={{marginTop:20, display:'block'}}>Upload Dokumen:</label>
        <input type="file" name="file" accept="image/*" />

        <button type="submit" style={{
          marginTop:20,
          padding:'10px 20px',
          background:'#1e40af',
          color:'#fff',
          border:'none',
          borderRadius:6
        }}>
          Verifikasi
        </button>
      </form>
    </main>
  );
        }
