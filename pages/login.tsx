import { useAuth0 } from "@auth0/auth0-react"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useInsertionEffect } from "react"
// recoil
import { useSetRecoilState } from "recoil"
import tokenState from "../recoil/atoms/tokenState"

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
  const setToken = useSetRecoilState(tokenState);

  // ログイン完了後にトークンを取得しRecoilへ格納
  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getToken();
  }, []);

  return (
    <div>
      <h2>ログイン状態</h2>
      {isAuthenticated ? (
        <>
          <p>ログイン中です</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            ログアウト
          </button>
          <button
            onClick={() => {
              router.push("/blog");
            }}
          >
            記事投稿ページへ
          </button>
        </>
      ) : (
        <p>ログアウトしています</p>
      )}
    </div>
  )
}

export default LoginPage