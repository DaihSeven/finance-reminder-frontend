import { useState, useEffect, type FormEvent } from "react";
import { useProfileController } from "@/controllers/useProfile";
import { useAuth } from "@/context/AuthContext";
import styles from "./ProfilePage.module.css";

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const AVATARS = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",  
  "/avatars/avatar6.png",
  "/avatars/avatar7.png",
  "/avatars/avatar8.png",
];

export default function ProfilePage() {
  const { user, loading, error, success, handleUpdatePhone } =
    useProfileController();
  const { avatar, updateAvatar } = useAuth();

  const [phone, setPhone]                       = useState(user?.phone ?? "");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  useEffect(() => {
  setPhone(user?.phone ?? "")
  }, [user])

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    handleUpdatePhone(phone);
  }

  function handleSelectAvatar(src: string) {
    updateAvatar(src);
    setShowAvatarPicker(false);
  }

  function handleRemoveAvatar() {
    updateAvatar(null);
    setShowAvatarPicker(false);
  }

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Perfil</h1>
        <p className={styles.subtitle}>Suas informações pessoais</p>
      </div>

      {/* Card do usuário */}
      <div className={styles.profileCard}>

        {/* Avatar com botão de editar */}
        <div className={styles.avatarWrapper}>
          {avatar ? (
            <img src={avatar} alt="Avatar" className={styles.avatarImg} />
          ) : (
            <div className={styles.avatar}>
              {user?.name ? getInitials(user.name) : "?"}
            </div>
          )}
          <button
            className={styles.editAvatarBtn}
            onClick={() => setShowAvatarPicker((v) => !v)}
            title="Trocar avatar"
          >
            ✏️
          </button>
        </div>

        <div className={styles.userInfo}>
          <span className={styles.userName}>{user?.name ?? "—"}</span>
          <span className={styles.userEmail}>{user?.email ?? "—"}</span>
          {user?.phone && (
            <span className={styles.userPhone}>📱 {user.phone}</span>
          )}
          {user?.createdAt && (
            <span className={styles.userSince}>
              Membro desde {formatDate(user.createdAt)}
            </span>
          )}
        </div>
      </div>

      {/* Seletor de avatar — abre ao clicar no lápis */}
      {showAvatarPicker && (
        <div className={styles.avatarPicker}>
          <p className={styles.avatarPickerTitle}>Escolha um avatar</p>

          <div className={styles.avatarGrid}>

            {/* Opção iniciais */}
            <button
              className={`${styles.avatarOption} ${
                avatar === null || avatar === '' ? styles.avatarOptionActive : ''
              }`}
              onClick={handleRemoveAvatar}
              title="Usar iniciais"
            >
              <div className={styles.avatarInitials}>
                {user?.name ? getInitials(user.name) : "?"}
              </div>
              <span className={styles.avatarOptionLabel}>Iniciais</span>
            </button>

            {/* 4 avatares PNG */}
            {AVATARS.map((src) => (
              <button
                key={src}
                className={`${styles.avatarOption} ${avatar === src ? styles.avatarOptionActive : ""}`}
                onClick={() => handleSelectAvatar(src)}
              >
                <img src={src} alt="Avatar" className={styles.avatarOptionImg} />
                <span className={styles.avatarOptionLabel}>
                  {avatar === src ? "✓ Ativo" : "Selecionar"}
                </span>
              </button>
            ))}

          </div>
        </div>
      )}

      {/* Formulário de telefone */}
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Atualizar telefone</h2>

        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>Telefone</label>
            <input
              id="phone"
              className={styles.input}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: 41999998888"
              autoComplete="tel"
            />
            <span className={styles.hint}>
              Somente números com DDD. Ex: 41999998888
            </span>
          </div>

          {error   && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Salvando..." : "Salvar telefone"}
          </button>
        </form>
      </div>

      {/* Badge JWT */}
      <div className={styles.jwtCard}>
        <div className={styles.jwtDot} />
        <span className={styles.jwtText}>Sessão ativa —</span>
        <span className={styles.jwtBadge}>JWT autenticado · v2</span>
      </div>

    </div>
  );
}