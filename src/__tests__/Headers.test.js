import { render, screen } from "@testing-library/react"
import Headers from "../structure/Headers"
import AuthWrapper from "../auth/AuthWrapper"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import appStore from "../utils/appStore"

describe('Headers test cases', ()=> {
    it('Headers test cases to check login button exists', ()=> {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <AuthWrapper>
                        <Headers />
                    </AuthWrapper>
                </Provider>
            </BrowserRouter>
        )
    
        const loginButton = screen.getByRole('button', {name: 'Login'});
        expect(loginButton).toBeInTheDocument();
    })
});